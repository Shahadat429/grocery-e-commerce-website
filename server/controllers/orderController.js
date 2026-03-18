import e from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe';
import User from '../models/User.js';


// Place order COD: /api/order/cod
export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        //calculate total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        //add tax (2%)
        amount += Math.floor(amount * 0.02);

        //create order
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
            isPaid: false,
            status: 'cod'
        })
        res.json({ success: true, message: "Order placed successfully" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}


// Place order stripe: /api/order/stripe
export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: "Invalid data" });
        }

        let productData = [];

        //calculate total amount
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0);

        //add tax (2%)
        amount += Math.floor(amount * 0.02);

        //create order
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
            isPaid: false,
            status: 'pending'
        })


        //stripe gateway
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        //create line items for stripe checkout
        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02),
                },
                quantity: item.quantity
            }
        })

        //create stripe checkout session
        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })


        res.json({ success: true, url: session.url });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

// Stripe webhook: /stripe
export const stripeWebhook = async (req, res) => {
    // stripe gateway initialization
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
    }

    // handle the event
    switch (event.type) {

        case "checkout.session.completed": {
            const session = event.data.object;
            const { orderId, userId } = session.metadata;

            // Update order as paid
            await Order.findByIdAndUpdate(orderId, {
                isPaid: true,
                status: 'paid'
            });

            // Clear user's cart
            await User.findByIdAndUpdate(userId, { cartItems: {} });

            
            break;
        }

        case "checkout.session.expired":
        case "payment_intent.payment_failed": {
            const session = event.data.object;
            const { orderId } = session.metadata;

            // Mark order as failed
            await Order.findByIdAndUpdate(orderId, { status: 'failed' });
            break;
        }

        default:
            console.error(`Unhandled event type: ${event.type}`);
            break;
    }

    res.json({ received: true });

}

// Get orders by user id: /api/order/user
export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });
        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Get all orders(for seller/admin): /api/order/seller
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate('items.product address').sort({ createdAt: -1 });
        res.json({ success: true, orders });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
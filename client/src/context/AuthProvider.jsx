import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import { dummyProducts } from '../assets/assets';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AuthProvider = ({ children }) => {

    const currency = '$';

    // const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    //fetch seller status
    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/is-auth');
            if (data.success) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        } catch (error) {
            setIsSeller(false);
        }
    }

    // Fetch auth user status, user data and cart items
    const fetchUser = async () => {
        console.log('fetchUser called'); 
        try {
            const { data } = await axios.get('/api/user/is-auth');
            console.log('fetchUser response:', data);
            if (data.success) {
                console.log('User authenticated:', data.user);
                setUser(data.user);
                setCartItems(data.user.cartItems || {});
            } else {
                setUser(null);
                setCartItems({});
            }
        } catch (error) {
            setUser(null);
            setCartItems({});
        }
    }

    // Fetch products
    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/list');
            if (data.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);
        toast.success("Product added to cart");

    }

    //Update product quantity in cart
    const updateQuantity = (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated successfully");
    }

    //Remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] -= 1;

            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }
        toast.success("Product removed from cart");
        setCartItems(cartData);
    }

    useEffect(() => {
        fetchProducts();
        fetchSeller();
        fetchUser();
    }, []);


    //update database cart items when cartItems state changes
    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItems });
                if (!data.success) {
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
        if (user) {
            updateCart();
        }
    }, [cartItems])

    //get cart items count
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            totalCount += cartItems[items];
        }
        return totalCount;
    }

    //get cart total amount
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            if (cartItems[items] > 0) {
                totalAmount += cartItems[items] * itemInfo.offerPrice;
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }

    const userInfo = {
        user,
        setUser,
        isSeller,
        setIsSeller,
        showUserLogin,
        setShowUserLogin,
        products,
        currency,
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        searchQuery,
        setSearchQuery,
        getCartCount,
        getCartAmount,
        axios,
        fetchProducts
    }

    return (

        <AuthContext value={userInfo}>
            {children}
        </AuthContext>

    );
};

export default AuthProvider;
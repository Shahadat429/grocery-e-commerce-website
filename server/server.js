import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhook } from './controllers/orderController.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//mongoDB connection
await connectDB();

//cloudinary connection
await connectCloudinary();

//allowed multiple origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://grocery-e-commerce-website.vercel.app'
];

app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhook);

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true}));


app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

//mongoDB connection
await connectDB();

//cloudinary connection
await connectCloudinary();

//allowed multiple origins
const allowedOrigins = [
  'http://localhost:5173'
];

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));


app.get('/', (req, res) => res.send('Server is running'));
app.use('/api/user', userRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
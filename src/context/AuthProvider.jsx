import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router';
import { dummyProducts } from '../assets/assets';
import toast, { Toaster } from 'react-hot-toast';

const AuthProvider = ({ children }) => {

    const currency = '$';

    // const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    // Fetch products (dummy implementation)
    const fetchProducts = async () => {
        setProducts(dummyProducts);
    }

    //Add product to cart
    const addToCart = (itemId) => {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
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
        if(cartData[itemId]){
            cartData[itemId] -= 1;

            if(cartData[itemId] === 0){
                delete cartData[itemId];
            }
        }
        toast.success("Product removed from cart");
        setCartItems(cartData);
    }

    useEffect( () => {
        fetchProducts();
    }
        ,[])

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
        addToCart,
        updateQuantity,
        removeFromCart,
    }

    return (
        <div>
            <AuthContext value={userInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;
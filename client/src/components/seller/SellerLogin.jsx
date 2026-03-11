import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

const SellerLogin = () => {

    const { isSeller, setIsSeller } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if(isSeller){
            navigate('/seller');
        }
    },[]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        setIsSeller(true);
    };

    return !isSeller && (
        <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600'>

            <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-88 rounded-lg shadow-xl border border-gray-200'>
                <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>

                <div className='w-full'>
                    <p>Email</p>
                    <input 
                        type="email"
                        placeholder='Enter your email' 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' 
                        required />
                </div>
                
                <div className='w-full'>
                    <p>Password</p>
                    <input 
                        type="password"
                        placeholder='Enter your password' 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary' 
                        required />
                </div>
                
                <button className='bg-primary text-white w-full py-2 rounded-md cursor-pointer'>Login</button>

            </div>

        </form>
    );
};

export default SellerLogin;
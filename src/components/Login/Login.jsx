import React from 'react';

const Login = () => {
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50'>
            <form className="bg-white rounded-lg shadow-xl text-sm text-gray-500 border border-gray-200 p-8 
            py-12 w-80 sm:w-[352px]">
                <p className="text-2xl font-medium text-center">
                    <span className="text-indigo-500">User</span> Login </p>

                <div className="mt-4">
                    <label className="block">Email</label>
                    <input type="email" placeholder="type here" required
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
                </div>

                <div className="mt-4">
                    <label className="block">Password</label>
                    <input type="password" placeholder="type here" required
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"/>
                </div>

                <p className="mt-4">
                    Create an account?
                    <a href="#" className="text-indigo-500">Click here</a>
                </p>

                <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md mt-4 cursor-pointer">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
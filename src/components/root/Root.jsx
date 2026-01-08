import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';

const Root = () => {

    const isSeller = useLocation().pathname.includes('/seller');

    return (
        <div>
            <Navbar></Navbar>
            <div className={`${isSeller ? '': 'px-6 md:px-16 lg:px-24 xl:px-36'}`}>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Root;
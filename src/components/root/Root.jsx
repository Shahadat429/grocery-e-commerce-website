import React from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';

const Root = () => {

    const hideFooter =
        location.pathname === "/login" ||
        location.pathname.startsWith("/seller");
    return (
        <div>
            <Navbar></Navbar>
            <div className={`${hideFooter ? '' : 'px-6 md:px-16 lg:px-24 xl:px-36'}`}>
                <Outlet></Outlet>
                {!hideFooter && <Footer></Footer>}
            </div>
        </div>
    );
};

export default Root;
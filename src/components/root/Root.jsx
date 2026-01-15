import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../navbar/Navbar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../context/AuthContext';
import Login from '../Login/Login';

const Root = () => {
    const location = useLocation();
    const hideFooter = location.pathname.startsWith("/seller");
    const { showUserLogin } = useContext(AuthContext);
    return (
        <div>
            <Navbar></Navbar>
            <div className={`${hideFooter ? '' : 'px-6 md:px-16 lg:px-24 xl:px-36'}`}>
                <Outlet></Outlet>
                {!hideFooter && <Footer></Footer>}
            </div>
            {showUserLogin ? <Login /> : null}
        </div>
    );
};

export default Root;
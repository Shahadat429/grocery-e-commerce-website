// src/components/seller/SellerRoute.jsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import SellerLogin from "../seller/SellerLogin";
import SellerLayout from "../../pages/seller/SellerLayout";


const SellerRoutes = () => {
  const { isSeller } = useContext(AuthContext);

  if (!isSeller) {
    return <SellerLogin />;
  }

  return <SellerLayout />;
};

export default SellerRoutes;

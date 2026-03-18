import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../../pages/Home";
import AllProducts from "../../pages/AllProducts";
import ProductCategories from "../../pages/ProductCategories";
import ProductDetails from "../../pages/ProductDetails";
import Cart from "../../pages/Cart";
import AddAddress from "../../pages/AddAddress";
import MyOrders from "../../pages/MyOrders";
import SellerRoutes from "./SellerRoutes";
import SellerProductList from "../../pages/seller/SellerProductList";
import SellerAddProduct from "../../pages/seller/SellerAddProduct";
import SellerOrders from "../../pages/seller/SellerOrders";
import Loading from "../Loading";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path:"/allproducts",
        Component: AllProducts
      },
      {
        path: "/products/:category",
        Component: ProductCategories
      },
      {
        path: "/products/:category/:id",
        Component: ProductDetails
      },
      {
        path: "/cart",
        Component: Cart
      },
      {
        path: "/add-address",
        Component: AddAddress
      },
      {
        path: "/my-orders",
        Component: MyOrders
      },
      {
        path: "/loader",
        Component: Loading
      }
    ]
  },
  {
    path: "/seller",
    Component: SellerRoutes,
    children: [
      {
        index: true,
        Component: SellerAddProduct
      },
      {
        path: "product-list",
        Component: SellerProductList
      },
      {
        path: "orders",
        Component: SellerOrders
      }
    ]
  }
]);

export default Routes;
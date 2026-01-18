import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../../pages/Home";
import Login from "../Login/Login";
import AllProducts from "../../pages/AllProducts";

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
        path: "/seller"
      }
    ]
  },
]);

export default Routes;
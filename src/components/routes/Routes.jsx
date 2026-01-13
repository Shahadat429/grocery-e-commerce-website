import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../../pages/Home";
import Login from "../Login/Login";

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
        path: "/login",
        Component: Login
      },
      {
        path: "/seller"
      }
    ]
  },
]);

export default Routes;
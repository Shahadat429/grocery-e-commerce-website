import React from "react";
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../../pages/Home";

const Routes = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        path: '/',
        Component: Home
      },
      {
        path: '/seller',
      }
    ]
  },
]);

export default Routes;
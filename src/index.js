import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Index from "./routes/Index";
import Shop from "./routes/Shop";
import Cart, { loader as CartLoader } from "./routes/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "s",
        element: <Shop />,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: CartLoader,
      },
      { index: true, element: <Index /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);

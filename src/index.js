import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import Index from "./routes/Index";
import Shop from "./routes/Shop";
import Error from "./routes/Error";
import Cart, {
  loader as CartLoader,
  action as CartAction,
} from "./routes/Cart";
import Product, { loader as ProductLoader } from "./routes/Product";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: "s",
        element: <Shop />,
      },
      {
        path: "product/:productSlug",
        element: <Product />,
        loader: ProductLoader,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: CartLoader,
        action: CartAction,
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

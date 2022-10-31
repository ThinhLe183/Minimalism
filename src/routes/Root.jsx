import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BackToTopBtn from "../components/BackToTopBtn";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";

import { useCartStore, useUserStore } from "../state_management/store";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Loading from "../components/Loading";
import { fetchCart } from "../action/cart";
import "react-toastify/dist/ReactToastify.css";
const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-white",
  dark: "bg-white-600 font-gray-300",
};
export default function Root() {
  const { user, setUser } = useUserStore((state) => state);
  const { setCart } = useCartStore((state) => state);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userCart = await fetchCart(user.uid);
        setCart(userCart);
        return;
      }
      setUser(null);
      setCart([]);
      return () => {
        unsub();
      };
    });
  }, [setUser, setCart]);

  if (!user) return <Navigate to={"/login"} />;

  if (typeof user === "undefined") {
    return <Loading />;
  }

  return (
    <div className="relative pt-24 font-barlow">
      <ToastContainer
        autoClose={1500}
        hideProgressBar={true}
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " relative flex p-3 mt-3 min-h-20 rounded-2xl justify-between overflow-hidden cursor-pointer shadow-xl"
        }
      />
      <BackToTopBtn />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

import React, { useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BackToTopBtn from "../components/BackToTopBtn";
import { ToastContainer } from "react-toastify";
import { useStore } from "../state_management/store";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Loading from "../components/Loading";
import "react-toastify/dist/ReactToastify.css";
import shallow from "zustand/shallow";
import { fetchAllProducts } from "../action/products";
import { async } from "@firebase/util";
import { fetchCart } from "../action/cart";

const contextClass = {
  success: "bg-blue-600",
  error: "bg-red-600",
  info: "bg-gray-600",
  warning: "bg-orange-400",
  default: "bg-white",
  dark: "bg-white-600 font-gray-300",
};
// export const loader = async () => {
//   const products = await fetchAllProducts();
//   const sub = onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const cart = await fetchCart();
//       return { products, user, cart };
//     } else return products;
//   });
//   console.log(data)
// };
export default function Root() {
  const { user, fetchProducts, fetchCart, setUser } = useStore(
    (state) => ({
      user: state.user,
      fetchProducts: state.fetchProducts,
      fetchCart: state.fetchCart,
      setUser: state.setUser,
    }),
    shallow
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      await fetchProducts();
      if (user) {
        setUser(user);
        await fetchCart();
        return;
      }
      setUser(null);
      await fetchCart();

      return () => {
        unsub();
      };
    });
  }, [setUser, fetchProducts, fetchCart]);

  if (typeof user === "undefined") {
    return <Loading />;
  }
  return (
    <div className="relative pt-24 font-barlow">
      <ToastContainer
        pauseOnHover={false}
        autoClose={500}
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

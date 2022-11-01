import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { addProduct, updateProduct } from "../action/cart";
import { useCartStore, useUserStore } from "../state_management/store";
import { toastAdded, toastUpdated } from "../action/toastSnip";
import LoadingLayer from "./LoadingLayer";
import slugify from "slugify";

export default function ProductCard({ product }) {
  const { user } = useUserStore((state) => state);
  const { cart, setCart, updateProductInCart } = useCartStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const handleAddToCart = async (size) => {
    if (!user) {
      setIsNeedLogin(true);
      return;
    }
    try {
      setIsLoading(true);
      const data = {
        ...product,
        quantity: 1,
        size,
      };
      let productIndexUpdating = cart.findIndex(
        (item) => item.name === data.name && item.size === data.size
      );
      if (productIndexUpdating >= 0) {
        await updateProduct(user.uid, cart[productIndexUpdating], {
          quantity: cart[productIndexUpdating].quantity + 1,
        });
        updateProductInCart(cart[productIndexUpdating].id, {
          quantity: cart[productIndexUpdating].quantity + 1,
        });
        toastUpdated();
      } else {
        const addedProduct = await addProduct(user.uid, data);
        setCart([addedProduct, ...cart]);
        toastAdded(data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  if (isNeedLogin) return <Navigate to={"/login"} />;
  return (
    <div
      className="card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <figure className="relative rounded-3xl min-h-[20rem] sm:min-h-[26rem] bg-[#F2F2F2] ">
        {isLoading && <LoadingLayer extendClass={"fill-red-600"} size={12} />}
        <Link to={`product/${product.slug}`}>
          <img src={product.imageSrc} alt={product.imageAlt} />
        </Link>
        <Transition
          show={isHovering}
          enter="transition ease-in-out duration-300"
          enterFrom="translate-y-0 opacity-0"
          enterTo="-translate-y-5 opacity-100"
          leave="transition ease-in-out duration-300 "
          leaveFrom="-translate-y-5 opacity-100"
          leaveTo="translate-y-0 opacity-0"
          as="button"
          className="absolute inset-x-0 bottom-0 flex justify-center items-center cursor-auto"
        >
          <div className="grid grid-rows-2 grid-cols-3 sm:grid-cols-4 gap-2">
            {sizes.map((size) => (
              <div
                key={size}
                onClick={() => handleAddToCart(size)}
                className="btn btn-square bg-white hover:text-white text-black border-none rounded-2xl font-bold"
              >
                {size}
              </div>
            ))}
          </div>
        </Transition>
      </figure>
      <div className="card-body px-6 ">
        <h3 className="text-sm font-bold">{product.name}</h3>
        <p className="">{product.price.toLocaleString("de-DE")}đ</p>
      </div>
    </div>
  );
}

import React from "react";
import slugify from "slugify";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { useStore } from "../state_management/store";

import LoadingLayer from "./LoadingLayer";
import { RadioGroup } from "@headlessui/react";
import shallow from "zustand/shallow";
export default function ProductCard({ product }) {
  const [colorSelected, setColorSelected] = useState(product.colors[0]);
  const { user, addProductToCart } = useStore(
    (state) => ({
      user: state.user,
      addProductToCart: state.addProductToCart,
    }),
    shallow
  );
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
        name: product.name,
        price: product.price,
        quantity: 1,
        size,
        color: colorSelected.name,
        img: colorSelected.img,
      };
      await addProductToCart(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  if (isNeedLogin) return <Navigate to={"/login"} />;
  return (
    <div className="card">
      <figure
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="relative "
      >
        {isLoading && <LoadingLayer extendClass={"fill-red-600"} size={12} />}
        <Link
          to={`product/${product.slug}?color=${slugify(colorSelected.name, {
            local: "vi",
          })}`}
        >
          <img src={colorSelected.img} alt="" className="rounded-3xl " />
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
          className="hidden absolute inset-x-0 bottom-0 md:flex justify-center items-center cursor-auto "
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
      <div className="space-y-4 mt-5 px-2">
        <RadioGroup
          value={colorSelected}
          onChange={setColorSelected}
          className={"flex flex-wrap justify-start pt-1 gap-3"}
        >
          {product.colors.map((color) => (
            <RadioGroup.Option
              key={color.colorCode}
              value={color}
              className={
                "w-1/6 h-6 rounded-lg glass ui-checked:outline outline-2  outline-offset-2 "
              }
              style={{ backgroundColor: color.colorCode }}
            ></RadioGroup.Option>
          ))}
        </RadioGroup>
        <div>
          <h3 className="text-sm font-bold">{product.name}</h3>
          <p className="">{product.price.toLocaleString("de-DE")}đ</p>
        </div>
      </div>
    </div>
  );
}

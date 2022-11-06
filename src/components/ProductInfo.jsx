import React from "react";
import ProductPolicy from "./ProductPolicy";
import ProductBredcumb from "./ProductBredcumb";
import ProductOptions from "./ProductOptions";
export default function ProductInfo({ product, colorPicked }) {
  return (
    <div className="w-full px-5">
      <div className="w-fit mx-auto text-sm">
        <ProductBredcumb name={product.name} color={colorPicked.name} />
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-[3]">
            <figure className="sm:h-screen rounded-3xl bg-[#F8F8F8] flex items-center justify-center ">
              <img
                src={colorPicked.img}
                alt=""
                className={` h-5/6 w-auto mx-auto `}
              />
            </figure>
          </div>
          <div className="flex-[2] lg:pl-5 divide-y">
            <div className="pb-5 space-y-2">
              <div className="text-3xl font-bold">{product.name}</div>
              <div className="text-lg">
                <span>{product.price.toLocaleString("de-DE")}đ</span>
              </div>
            </div>
            <ProductOptions product={product} colorPicked={colorPicked} />
            <ProductPolicy />
          </div>
        </div>
      </div>
    </div>
  );
}

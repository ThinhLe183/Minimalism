import React, { useRef } from "react";
import products from "../product";
import ProductCard from "./ProductCard";
// For Typescript
// import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ListProduct({ title }) {
  const swiperRef = useRef();
  return (
    <div className="mx-5 md:mx-12 lg:mx-16">
      <div className="flex items-center justify-between mt-24 mb-12 ">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="space-x-6">
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => swiperRef.current.slidePrev()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => swiperRef.current.slideNext()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          890: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1120: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {products.map((product) => (
          <SwiperSlide key={product.name}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

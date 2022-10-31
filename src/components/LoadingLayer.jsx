import React from "react";
export default function LoadingLayer({ extendClass, size }) {
  return (
    <div
      className={`absolute z-10 bg-opacity-60 inset-0 flex justify-center items-center bg-white rounded-3xl ${extendClass}`}
    >
      <svg
        version="1.1"
        id="L9"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={`animate-spin h-${4 * size} w-${4 * size}`}
      >
        <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"></path>
      </svg>
    </div>
  );
}

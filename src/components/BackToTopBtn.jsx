import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
export default function BackToTopBtn() {
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const onScroll = window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    });
    return window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={` h-12 w-12 flex justify-center items-center rounded-full fixed bottom-5 right-5 z-30 border-none shadow-xl opacity-80 hover:bg-red-400 bg-red-600 ${
        isShow ? "" : "hidden"
      }`}
    >
      <ChevronUpIcon className="h-6 w-6 font-bold text-white" />
    </button>
  );
}

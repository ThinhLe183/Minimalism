import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../state_management/store";
import Marquee from "react-fast-marquee";
import MiniCart from "./MiniCart";
import NotifyBtn from "./NotifyBtn";
import ProfileBtn from "./ProfileBtn";

export default function Header() {
  const { user } = useUserStore((state) => state);
  const [isScrollDown, setIsScrollDown] = useState();
  useEffect(() => {
    let prevY = window.scrollY;
    const onScroll = window.addEventListener("scroll", () => {
      const currentY = window.scrollY;
      if (prevY > currentY || currentY < 200) {
        setIsScrollDown(false);
      } else {
        setIsScrollDown(true);
      }

      prevY = currentY;
    });

    return window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className={`transition-all duration-300 fixed top-0 inset-x-0 z-10 ${
        isScrollDown && "-translate-y-full"
      }`}
    >
      <div className="w-full h-8 flex items-center bg-[#183668]">
        <Marquee gradient={false} speed={100} className="text-white ">
          <div className="w-screen uppercase">
            Inspired by{" "}
            <a href="https://www.coolmate.me/" target={"#"} className="link">
              coolmate
            </a>
          </div>
          <div className="w-screen ">
            Dự án chỉ sử dụng cho mục đích học tập
          </div>
          <div className="w-screen ">
            Hóa đơn trên 200.000đ được miễn phí vận chuyển
          </div>
        </Marquee>
      </div>
      <div className={`navbar px-8 lg:px-16 sm:px-2 border-b bg-white w-full`}>
        <div className="navbar-start">
          <Link to={"/"} className="font-mono text-2xl">
            Minimalism
          </Link>
        </div>

        <div className="navbar-end gap-2 md:gap-6">
          <MiniCart />
          <NotifyBtn />
          {user ? (
            <ProfileBtn user={user} />
          ) : (
            <Link to={"/login"} className="btn btn-primary rounded-xl">
              Get Started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

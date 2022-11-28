import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-black text-slate-300 mt-8">
      <footer className="footer p-10 ">
        <div>
          <span className="footer-title font-serif text-white">Contact</span>
          <div>
            <span className="font-semibold">City:</span>{" "}
            <span>Ho Chi Minh city</span>
          </div>
          <div>
            <span className="font-semibold">Address:</span>{" "}
            <span>105 Bà Huyện Thanh Quan</span>
          </div>
          <div>
            <span className="font-semibold">Gmail:</span>{" "}
            <span>minimalism.vn.shop@gmail.com</span>
          </div>
          <div>
            <span className="font-semibold">Phone:</span>{" "}
            <span>0763729994</span>
          </div>
        </div>
        <div>
          <span className="footer-title font-serif text-white">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </footer>
      <footer className="footer px-10 py-4  ">
        <div className="items-center grid-flow-col">
          <p>Copyright © 2022 - All right reserved - Thinh Le</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4 text-3xl">
            <a href="www.instagram.com/minimalism.vn.shop" target="#">
              <AiFillInstagram />
            </a>
            <a href="https://www.facebook.com/minimalism.vn.shop" target="#">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

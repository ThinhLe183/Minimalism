import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import ShippingForm from "../components/ShippingForm";
import { useUserStore } from "../state_management/store";
import CartOrder from "../components/CartOrder";
export const loader = () => {
  return axios.get("https://provinces.open-api.vn/api/?depth=3");
};
export default function Cart() {
  const provinces = useLoaderData().data;
  const { user } = useUserStore((state) => state);
  
  return (
    <div className=" flex flex-col-reverse md:flex-row md:divide-x justify-between gap-8 md:gap-0 px-3 lg:px-16 text-sm ">
      <div className="md:px-8 flex-1">
        <ShippingForm user={user} provinces={provinces} />
      </div>
      <div className=" md:px-8 md:w-5/12">
        <CartOrder user={user} />
      </div>
    </div>
  );
}

import React from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import ShippingForm from "../components/ShippingForm";
import { useStore } from "../state_management/store";
import CartOrder from "../components/CartOrder";
import { Navigate } from "react-router-dom";

export const loader = () => {
  return axios.get("https://vapi.vnappmob.com/api/province");
};
export const action = async ({ request }) => {
  const formData = await request.formData();
  const shippingInfo = Object.fromEntries(formData);
  const errors = {};
  console.log(shippingInfo);
  // validate the fields
  // if (typeof email !== "string" || !email.includes("@")) {
  //   errors.email =
  //     "That doesn't look like an email address";
  // }

  // return data if we have errors
  if (Object.keys(errors).length) {
    return errors;
  }
  return;
};
export default function Cart() {
  const provinces = useLoaderData().data.results;
  const user = useStore((state) => state.user);
  if (!user) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div className=" flex flex-col-reverse md:flex-row md:divide-x justify-between gap-8 md:gap-0 px-3 lg:px-16 text-sm ">
      <div className="md:px-8 flex-1">
        <ShippingForm provinces={provinces} />
      </div>
      <div className=" md:px-8 md:w-5/12">
        <CartOrder />
      </div>
    </div>
  );
}

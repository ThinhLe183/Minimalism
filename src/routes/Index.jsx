import React from "react";
import { addProducts } from "../action/products";
import Hero from "../components/Hero";
import ListProduct from "../components/ListProduct";
import CountDown from "../components/CountDown";
export default function Index() {
  return (
    <div>
      <Hero />
      {/* <button onClick={addProducts}>Add</button> */}
      <CountDown />
      <ListProduct title={"Best Sellers"} />
    </div>
  );
}

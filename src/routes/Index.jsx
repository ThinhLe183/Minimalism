import React from "react";
import { addProductsToDb } from "../action/products";
import Hero from "../components/Hero";
import ListProduct from "../components/ListProduct";
import CountDown from "../components/CountDown";
export default function Index() {
  return (
    <div>
      <Hero />
      {/* <button onClick={addProductsToDb}>Add</button> */}
      <CountDown />
      <ListProduct title={"New Products"} />
    </div>
  );
}

import React from "react";

import Hero from "../components/Hero";
import ListProduct from "../components/ListProduct";
import CountDown from "../components/CountDown";
export default function Index() {

  return (
    <div>
      <Hero />
      <CountDown />
      <ListProduct title={"Best Sellers"} />
    </div>
  );
}

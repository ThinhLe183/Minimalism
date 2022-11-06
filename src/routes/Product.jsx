import React from "react";
import { useLoaderData } from "react-router-dom";
import { getProduct } from "../action/products";
import slugify from "slugify";
import ProductInfo from "../components/ProductInfo";
export const loader = async ({ params, request }) => {
  const url = new URL(request.url);
  const colorQuery = url.searchParams.get("color");
  const product = await getProduct(params.productSlug);
  const color =
    product.colors.find(
      (color) => slugify(color.name, { locale: "vi" }) === colorQuery
    ) || product.colors[0];
  return { product, color };
};
export default function Product() {
  const { product, color } = useLoaderData();

  return (
    <div className="pt-8 ">
      <ProductInfo product={product} colorPicked={color} />
    </div>
  );
}

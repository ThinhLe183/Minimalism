import React from "react";
import { toast } from "react-toastify";
import { useStore } from "../state_management/store";
import shallow from "zustand/shallow";

export default function QuantityBox({ product, setIsLoading }) {
  const { updateProductInCart, removeProductFromCart } = useStore(
    (state) => ({
      updateProductInCart: state.updateProductInCart,
      removeProductFromCart: state.removeProductFromCart,
    }),
    shallow
  );

  const handleQuantityChange = async (action, newQuantity) => {
    setIsLoading(true);
    try {
      if (action === "increase") {
        await updateProductInCart(product, {
          quantity: product.quantity + 1,
        });
      }
      if (action === "decrease") {
        if (product.quantity === 1) {
          await removeProductFromCart(product.id);
        }
        await updateProductInCart(product, { quantity: product.quantity - 1 });
      }
      if (action === "change") {
        await updateProductInCart(product, { quantity: newQuantity });
      }

      toast(() => (
        <span className="text-sm text-black font-bold">
          Đã cập nhật giỏ hàng!
        </span>
      ));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex justify-between items-center outline outline-1 rounded-xl w-min">
      <button
        className="px-2 text-xl"
        onClick={async () => await handleQuantityChange("decrease")}
      >
        -
      </button>
      {/* <input
        type="text"
        className="focus:outline-none w-10 text-center"
        value={product.quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
        onBlur={async () => {
          const quantityConverted = parseInt(quantity);
          if (
        !isNaN(quantityConverted) &&
            quantityConverted > 0 &&
            quantityConverted !== quantityInit
          ) {
            await handleQuantityChange("change", quantityConverted);
          } else {
            console.log("active");
            setQuantity(quantityInit);
          }
        }}
      /> */}
      <div className="focus:outline-none w-10 text-center">
        {product.quantity}
      </div>
      <button
        className="px-2 text-xl"
        onClick={async () => await handleQuantityChange("increase")}
      >
        +
      </button>
    </div>
  );
}

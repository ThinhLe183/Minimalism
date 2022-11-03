import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStore } from "../state_management/store";
import shallow from "zustand/shallow";

export default function QuantityBox({ quantityInit, product }) {
 
  const { updateProductInCart, removeProductFromCart } = useStore(
    (state) => ({
      updateProductInCart: state.updateProductInCart,
      removeProductFromCart: state.removeProductFromCart,
    }),
    shallow
  );
  const [quantity, setQuantity] = useState(quantityInit);
  const handleQuantityChange = async (action, newQuantity) => {
    try {
      if (action === "increase") {
        // await updateProduct(user.uid, product.id, {
        //   quantity: quantityInit + 1,
        // });
        // updateProductInCart(product.id, { quantity: quantityInit + 1 });
        await updateProductInCart(product.id, { quantity: quantityInit + 1 });
      }
      if (action === "decrease") {
        if (parseInt(quantity) === 1) {
          // await deleteProduct(user.uid, product.id);
          // removeProductFromCart(product.id);
          await removeProductFromCart(product.id);
        }
        // await updateProduct(user.uid, product.id, {
        //   quantity: quantityInit - 1,
        // });
        // updateProductInCart(product.id, { quantity: quantityInit - 1 });
        await updateProductInCart(product.id, { quantity: quantityInit - 1 });
      }
      if (action === "change") {
        // await updateProduct(user.uid, product.id, { quantity: newQuantity });
        // updateProductInCart(product.id, { quantity: newQuantity });
        await updateProductInCart(product.id, { quantity: newQuantity });
      }
      setQuantity(product.quantity);
      toast(() => (
        <span className="text-sm text-black font-bold">
          Đã cập nhật giỏ hàng!
        </span>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between items-center outline outline-1 rounded-xl w-min">
      <button
        className="px-2 text-xl"
        onClick={async () => await handleQuantityChange("decrease")}
      >
        -
      </button>
      <input
        type="text"
        className="focus:outline-none w-10 text-center"
        value={quantity}
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
            setQuantity(quantityInit);
          }
        }}
      />
      <button
        className="px-2 text-xl"
        onClick={async () => await handleQuantityChange("increase")}
      >
        +
      </button>
    </div>
  );
}

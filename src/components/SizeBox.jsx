import React from "react";
import { useState } from "react";
import { Listbox } from "@headlessui/react";
import { updateProduct } from "../action/cart";
import { useCartStore, useUserStore } from "../state_management/store";
import { RiArrowDropRightLine } from "react-icons/ri";
import { toastUpdated } from "../action/toastSnip";
export default function SizeBox({ initSize, product }) {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const { user } = useUserStore((state) => state);
  const { updateProductInCart } = useCartStore((state) => state);

  const [selectedSize, setSelectedSize] = useState(initSize);

  const handleSizeChange = async (e) => {
    setSelectedSize(e);
    await updateProduct(user.uid, product, { size: e });
    updateProductInCart(product.id, { size: e });
    toastUpdated();
  };
  return (
    <Listbox
      value={selectedSize}
      onChange={async (e) => await handleSizeChange(e)}
      as="div"
      className={"relative w-16 ui-open:w-20 transition-all duration-300"}
    >
      <Listbox.Button className="w-full ring-1 ring-primary ui-open:ring-0  py-1 pl-4 pr-1 rounded-xl text-start flex justify-between items-center transition-all ui-open:rounded-b-none ui-open:bg-[#e3e3e3]">
        <div>{selectedSize}</div>
        <RiArrowDropRightLine className="text-xl w-6 transition-all ui-open:rotate-90 " />
      </Listbox.Button>
      <Listbox.Options className="absolute z-10 inset-x-0 shadow-lg bg-white rounded-b-xl w-full">
        {sizes.map((size) => (
          <Listbox.Option
            key={size}
            value={size}
            disabled={size === selectedSize}
            className="pl-4 hover:bg-[#e3e3e3] cursor-pointer ui-disabled:cursor-not-allowed"
          >
            {size}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

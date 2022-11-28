import React from "react";
import { Listbox } from "@headlessui/react";
import { useStore } from "../state_management/store";
import { RiArrowDropRightLine } from "react-icons/ri";
import { toastUpdated } from "../action/toastSnip";
export default function SizeBox({ product, setIsLoading }) {
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const { updateProductInCart } = useStore((state) => ({
    updateProductInCart: state.updateProductInCart,
  }));

  const onSizeChange = async (newSize) => {
    setIsLoading(true);
    await updateProductInCart(product, { size: newSize });
    toastUpdated();
    setIsLoading(false);
  };
  return (
    <Listbox
      value={product.size}
      onChange={async (size) => await onSizeChange(size)}
      as="div"
      className={"relative w-16 ui-open:w-20 transition-all duration-300"}
    >
      <Listbox.Button className="w-full ring-1 ring-primary ui-open:ring-0  py-1 pl-4 pr-1 rounded-xl text-start flex justify-between items-center transition-all ui-open:rounded-b-none ui-open:bg-[#e3e3e3]">
        <div>{product.size}</div>
        <RiArrowDropRightLine className="text-xl w-6 transition-all ui-open:rotate-90 " />
      </Listbox.Button>
      <Listbox.Options className="absolute z-10 inset-x-0 shadow-lg bg-white rounded-b-xl w-full">
        {sizes.map((size) => (
          <Listbox.Option
            key={size}
            value={size}
            disabled={size === product.size}
            className="pl-4 hover:bg-[#e3e3e3] cursor-pointer ui-disabled:cursor-not-allowed"
          >
            {size}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

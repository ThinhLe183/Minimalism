import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { addProductToCart, updateProduct } from "../action/cart";
import {
  useCartStore,
  useLoadingStore,
  useUserStore,
} from "../state_management/store";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
export default function ProductQuickview({ isOpen, setIsOpen, product }) {
  const { user } = useUserStore((state) => state);
  const { cart, setCart, updateProductQuantity } = useCartStore(
    (state) => state
  );
  const { isLoading, setIsLoading } = useLoadingStore((state) => state);
  const [size, setSize] = useState(sizes[0]);
  let quantityRef = useRef();
  const handleAddToCart = async (e, product) => {
    try {
  //     e.preventDefault();
  //     setIsLoading(true);
  //     let quantity = parseInt(quantityRef.current.value);

  //     const data = {
  //       ...product,
  //       quantity,
  //       size,
  //     };
  //     let productIndexUpdating = cart.findIndex(
  //       (item) => item.name === data.name && item.size === data.size
  //     );
  //     if (productIndexUpdating >= 0) {
  //       await updateProduct(
  //         user.uid,
  //         cart[productIndexUpdating],
  //         data.quantity
  //       );
  //       updateProductQuantity(cart[productIndexUpdating].id, data.quantity);
  //     } else {
  //       const addedProduct = await addProductToCart(user.uid, data);
  //       setCart([addedProduct, ...cart]);
  //     }

      setIsOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 flex justify-center items-center">
        <Dialog.Panel className="relative flex bg-white overflow-hidden rounded-lg shadow-xl min-w-max ">
          <XMarkIcon
            className="absolute w-6 hover:text-red-500 hover:cursor-pointer top-6 right-6 "
            onClick={() => setIsOpen(false)}
          />
          <div className="h-[28rem]">
            <img
              className="w-full h-full object-cover object-center rounded-l-lg"
              src={product.imageSrc}
              alt={product.imageAlt}
            />
          </div>
          <form className="space-y-4 p-6">
            <div className="space-y-2">
              <div className="text-slate-900 text-xl font-bold flex-auto">
                {product.name}
              </div>
              <div className="text-2xl text-gray-900">${product.price}</div>
            </div>
            {/* Quantity */}
            <label className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-900">Quantity:</div>
              <input
                type="number"
                id="quantity"
                ref={quantityRef}
                defaultValue="1"
                min="1"
                className="outline-none text-sm w-12"
              ></input>
            </label>

            {/* Size */}
            <div>
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Size</h4>
                <a
                  href="https://www.sizechart.com/t-shirt/men/index.html"
                  rel="noreferrer"
                  target="_blank"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>
              <RadioGroup
                value={size}
                onChange={setSize}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pt-2 pb-6 border-b border-slate-200 px-4 md:px-0 text-sm"
              >
                {sizes.map((size) => (
                  <RadioGroup.Option
                    key={size}
                    value={size}
                    className="
                      ui-checked:ring-2  ring-primary  text-center py-2 cursor-pointer rounded-lg  text-slate-700 "
                  >
                    {size}
                  </RadioGroup.Option>
                ))}
              </RadioGroup>
            </div>
            <div className="flex gap-4 items-center justify-between">
              <div className="space-x-4 flex-grow">
                <button
                  className="btn btn-primary btn-wide text-white "
                  disabled={isLoading}
                >
                  Buy now
                </button>
                {isLoading ? (
                  <button
                    disabled={true}
                    className="btn  btn-wide btn-outline loading "
                  >
                    loading
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="btn btn-outline btn-wide hover:bg-accent"
                    disabled={isLoading}
                  >
                    Add to cart
                  </button>
                )}
              </div>
              <Link
                to={`p/${product.id}`}
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Details
              </Link>
            </div>
            <p className="text-slate-700 text-sm">Shipping fee not included.</p>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

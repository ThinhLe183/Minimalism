import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { BsCart } from "react-icons/bs";
import { Form, useSubmit, Navigate } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import slugify from "slugify";
import { useStore } from "../state_management/store";
import shallow from "zustand/shallow";
import LoadingLayer from "./LoadingLayer";
import { toast } from "react-toastify";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductOptions({ product, colorPicked }) {
  let submit = useSubmit();

  const { user, addProductToCart } = useStore(
    (state) => ({ user: state.user, addProductToCart: state.addProductToCart }),
    shallow
  );
  const [isNeedLogin, setIsNeedLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sizeSelected, setSizeSelected] = useState();

  const [quantity, setQuantity] = useState(1);
  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      return;
    }
  };
  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleAddToCart = async () => {
    if (!user) {
      setIsNeedLogin(true);
      return;
    }
    if (!sizeSelected) {
      toast(() => (
        <div className="flex justify-start items-center gap-3">
          <BiError className="fill-red-500 text-2xl" />{" "}
          <p className="text-black">Bạn vẫn chưa chọn size</p>
        </div>
      ));
      return;
    }
    try {
      setIsLoading(true);
      const data = {
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: sizeSelected,
        color: colorPicked.name,
        img: colorPicked.img,
      };
      await addProductToCart(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  if (isNeedLogin) return <Navigate to={"/login"} />;

  return (
    <div className="py-5 space-y-5">
      <Form
        method="get"
        onChange={(e) => {
          submit(e.currentTarget, { replace: true });
        }}
        className={"space-y-5"}
      >
        <div>
          <p className="mb-3">
            Màu sắc:{" "}
            <span className="font-semibold capitalize">{colorPicked.name}</span>{" "}
          </p>
          <div className="flex flex-wrap gap-5 ">
            {product.colors.map((color) => (
              <label key={color.colorCode}>
                <input
                  type="radio"
                  name="color"
                  className={"sr-only peer"}
                  value={slugify(color.name, { locale: "vi" })}
                />
                <div
                  className={`w-8 h-8 rounded-full shadow-md cursor-pointer ${
                    colorPicked.name === color.name &&
                    "outline outline-2  outline-offset-4"
                  }`}
                  style={{
                    backgroundColor: color.colorCode,
                  }}
                ></div>
              </label>
            ))}
          </div>
        </div>
        {/* <input type="radio" name="size" className="radio" value={1} />
          <input type="radio" name="size" className="radio" value={2} /> */}
        <div>
          <p className="mb-3">
            Chọn size: <span className="font-semibold">{sizeSelected}</span>
          </p>
          <RadioGroup
            value={sizeSelected}
            onChange={setSizeSelected}
            className="flex gap-3"
          >
            {sizes.map((size) => (
              <RadioGroup.Option
                key={size}
                value={size}
                className={
                  "flex justify-center items-center bg-[#D9D9D9] rounded-xl py-4 h-6 w-1/6 ui-checked:bg-black ui-checked:text-white cursor-pointer"
                }
              >
                {size}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </div>
      </Form>
      <div className="flex justify-between items-center gap-10">
        <div className="flex justify-between items-center outline outline-1 rounded-xl w-1/5 h-10 ">
          <button className="px-2 " onClick={handleQuantityDecrease}>
            <AiOutlineMinus />
          </button>
          <div className="w-10 text-center text-xl">{quantity}</div>
          <button className="px-2 " onClick={handleQuantityIncrease}>
            <AiOutlinePlus />
          </button>
        </div>
        <button
          onClick={() => handleAddToCart()}
          disabled={isLoading}
          className="relative flex-grow bg-black text-white h-10 rounded-xl flex justify-center items-center gap-3 hover:bg-[#FAFAFA] hover:text-black hover:outline outline-1 "
        >
          {isLoading ? (
            <LoadingLayer extendClass={"bg-transparent fill-white"} size={4} />
          ) : (
            <>
              <BsCart className="text-xl" />
              <p>Thêm vào giỏ hàng</p>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useStore } from "../state_management/store";
import { toast } from "react-toastify";
import QuantityBox from "./QuantityBox";
import SizeBox from "./SizeBox";
import { MdClear } from "react-icons/md";
import Skeleton from "../components/Skeleton";
import shallow from "zustand/shallow";
export default function CartOrder({ user }) {
  const { cart, removeProductFromCart } = useStore(
    (state) => ({
      cart: state.cart,
      removeProductFromCart: state.removeProductFromCart,
    }),
    shallow
  );
  const [isLoading, setIsLoading] = useState(false);
  const handleRemoveProduct = async (productId) => {
    setIsLoading(true);
    try {
      await removeProductFromCart(productId);
      toast(() => (
        <span className="text-sm text-black font-bold">
          Đã xóa sản phẩm khỏi giỏ hàng
        </span>
      ));
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  const subTotal = cart.reduce(
    (prev, currentProd) => prev + currentProd.quantity * currentProd.price,
    0
  );
  const deliveryFee = subTotal >= 200000 ? 0 : 25000;
  const discount = 0;
  const total = subTotal + deliveryFee + discount;
  return (
    <>
      <h1 className="text-3xl font-bold mb-8 mt-12 ">Giỏ hàng</h1>
      <div className="divide-y-2 space-y-5">
        <div className="space-y-8">
          {isLoading
            ? cart.map((product) => {
                return <Skeleton key={product.id} />;
              })
            : cart.map((product) => (
                <div key={product.id} className="flex md:gap-5 gap-10">
                  <div className="indicator flex justify-center items-center h-48 w-32 rounded-2xl bg-[#F2F2F2]">
                    <div className="indicator-item h-6 w-6 rounded-full bg-primary text-white flex justify-center items-center text-xs font-bold">
                      {product.quantity}
                    </div>
                    <img
                      src={product.img}
                      alt=""
                      className="object-cover object-center scale-110"
                    />
                  </div>
                  <div className="flex-1 relative my-2 pr-8 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className=" font-bold">{product.name}</div>
                      <div className="capitalize">
                        {product.color} / {product.size}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <SizeBox initSize={product.size} product={product} />
                      <QuantityBox
                        quantityInit={product.quantity}
                        product={product}
                      />
                    </div>
                    <MdClear
                      onClick={async () =>
                        await handleRemoveProduct(product.id)
                      }
                      className="absolute w-6 h-6 top-0 right-0 cursor-pointer text-gray-500 hover:scale-100 scale-90"
                    />
                    <div className="absolute bottom-0 right-0">
                      {(product.price * product.quantity).toLocaleString(
                        "de-DE"
                      )}
                      đ
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="pt-5 w-full font-normal space-y-5">
          <div className="flex justify-between ">
            <p>Tạm tính</p>
            <p>{subTotal.toLocaleString("de-DE")}đ</p>
          </div>
          <div className="flex justify-between">
            <p>Giảm giá</p>
            <p>{discount.toLocaleString("de-DE")}đ</p>
          </div>
          <div className="flex justify-between">
            <p>Phí giao hàng</p>
            <p>
              {deliveryFee > 0
                ? `+ ${deliveryFee.toLocaleString("de-DE")}đ`
                : "Miễn phí"}
            </p>
          </div>
        </div>
        <div className="flex justify-between pt-5">
          <p>Tổng</p>{" "}
          <p className="text-xl">{total.toLocaleString("de-DE")}đ</p>
        </div>
      </div>
    </>
  );
}

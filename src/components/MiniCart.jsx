import React from "react";
import { BsCart } from "react-icons/bs";
import { IoIosClose } from "react-icons/io";
import { useCartStore, useUserStore } from "../state_management/store";
import { deleteProduct } from "../action/cart";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { toastAdded } from "../action/toastSnip";
export default function MiniCart() {
  const { cart, removeProductFromCart } = useCartStore((state) => state);
  const { user } = useUserStore((state) => state);

  const handleRemoveProduct = async (productId) => {
    try {
      await deleteProduct(user.uid, productId);
      removeProductFromCart(productId);
      toast(() => (
        <span className="text-sm text-black font-bold">
          Đã xóa sản phẩm khỏi giỏ hàng
        </span>
      ));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dropdown dropdown-hover dropdown-end">
      <div
        tabIndex={0}
        className="btn btn-sm btn-ghost btn-circle hover:scale-125 transition-all"
      >
        <div className="indicator ">
          <Link to={"/cart"}>
            <BsCart className="text-xl " />
          </Link>
          <span className="badge badge-sm indicator-item rounded-2xl ">
            {cart.length}
          </span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="pt-5 px-2 pb-5 card card-compact dropdown-content rounded-2xl translate-x-5"
      >
        <div className="card-body rounded-2xl bg-base-100 w-[24rem] p-15 shadow-lg ">
          {cart.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-3">
                <div className="">{cart.length} sản phẩm</div>
                <Link to={"/cart"} className=" text-blue-700">
                  Xem tất cả
                </Link>
              </div>
              <div className=" max-h-[22rem] overflow-auto space-y-3">
                {cart.map((product) => (
                  <div key={product.id} className="flex items-center gap-5 ">
                    <div className="h-24 w-20 overflow-hidden rounded-xl border border-slate-200">
                      <img
                        src={product.imageSrc}
                        alt="product"
                        className="h-full w-full object-cover object-center bg-[#F2F2F2]"
                      />
                    </div>
                    <div className="pr-5 flex-1 relative">
                      <p className="font-semibold text-sm ">{product.name}</p>
                      <p className="text-sm">
                        {product.color} / {product.size}
                      </p>
                      <div className="space-x-2 mt-3">
                        <span className="text-lg font-medium mt-1">
                          {product.price.toLocaleString("de-DE")}
                        </span>
                        <span className="text-sm">x{product.quantity}</span>
                      </div>
                      <IoIosClose
                        onClick={() => handleRemoveProduct(product.id)}
                        className="absolute w-6 h-6 top-0 right-0 cursor-pointer text-gray-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-center font-medium">
              Giỏ hàng trống, đi shopping thôi nào
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

import { toast } from "react-toastify";

export const toastAdded = (product) => {
  return toast(() => (
    <div className="divide-y text-sm text-black">
      <div className="font-bold pb-3">Đã thêm vào vỏ hàng!</div>
      <div className="flex items-center gap-5 pt-2">
        <div className="h-24 w-20 overflow-hidden rounded-xl border border-slate-200">
          <img
            src={product.img}
            alt="product"
            className="h-full w-full object-cover object-center bg-[#F2F2F2]"
          />
        </div>
        <div className="pr-5 flex-1">
          <p className="font-semibold text-sm ">{product.name}</p>

          <div className="mt-3">
            <p className="text-sm capitalize">
              {product.color} / {product.size}
            </p>
            <div className="text-base font-medium ">
              {product.price.toLocaleString("de-DE")}đ
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
};
export const toastRemoved = () => {
  return toast(() => (
    <span className="text-sm text-black font-bold">
      Đã xóa sản phẩm khỏi giỏ hàng
    </span>
  ));
};
export const toastUpdated = () => {
  return toast(() => (
    <span className="text-sm text-black font-bold">Đã cập nhật giỏ hàng!</span>
  ));
};

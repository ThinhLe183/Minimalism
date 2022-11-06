import React from "react";
import PolicyItem from "./PolicyItem";

export default function ProductPolicy() {
  return (
    <div className="flex flex-wrap justify-center items-center w-full py-5">
      <PolicyItem
        img={"https://www.coolmate.me/images/icons/icon3.svg"}
        line1={"Đổi trả cực dễ "}
        line2={"chỉ cần số điện thoại"}
      />
      <PolicyItem
        img={"https://www.coolmate.me/images/icons/icon4.svg"}
        line1={"Miễn phí vận chuyển "}
        line2={"cho đơn hàng trên 200k"}
      />
      <PolicyItem
        img={"https://www.coolmate.me/images/icons/icon5.svg"}
        line1={"60 ngày đổi trả "}
        line2={"vì bất kỳ lý do gì"}
      />
      <PolicyItem
        img={"https://www.coolmate.me/images/icons/icon2.svg"}
        line1={"Hotline 1900.00.00.00 "}
        line2={"hỗ trợ từ 8h30 - 22h mỗi ngày"}
      />
      <PolicyItem
        img={"https://www.coolmate.me/images/icons/icon1.svg"}
        line1={"Đến tận nơi nhận hàng trả, "}
        line2={"hoàn tiền trong 24h"}
      />
      <PolicyItem
        img={"https://www.coolmate.me/images/icons/icon6.svg"}
        line1={"Giao hàng nhanh toàn quốc"}
      />
    </div>
  );
}

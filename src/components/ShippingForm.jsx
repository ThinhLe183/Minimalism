import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";

import AddressBox from "./AddressBox";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
const paymentMethods = [
  {
    method: "COD",
    description: "Thanh toán khi nhận hàng",
    img: "https://www.coolmate.me/images/COD.svg",
  },
  {
    method: "Thanh toán MoMo",
    img: "https://www.coolmate.me/images/momo-icon.png",
  },
  {
    method: "Ví điện tử ZaloPay",
    img: "https://www.coolmate.me/images/logo-zalopay.svg",
  },
  {
    method: "Ví ShopeePay",
    img: "https://mcdn.coolmate.me/image/September2021/195dbf69c0ac36f26fbd_(1).png",
    description:
      "Giảm thêm 50k cho khách hàng lần đầu mở ví và thanh toán bằng ShopeePay",
  },
  {
    method: "Thẻ ATM / Internet Banking",
    img: "https://www.pngrepo.com/png/269904/512/debit-card-credit-card.png",

    description: "Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)",
  },
];
export default function ShippingForm({ provinces }) {
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [selectedMethod, setSelectedMethod] = useState("COD");
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const onSelectProvince = async (selectedOption) => {
    const districtsData = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${selectedOption.province_id}`
    );
    setDistricts(districtsData.data.results);
    setSelectedDistrict(undefined);
    setSelectedWard(undefined);
    setSelectedProvince(selectedOption.province_name);
  };
  const onSelectDistrict = async (selectedOption) => {
    const wardsData = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${selectedOption.district_id}`
    );
    setWards(wardsData.data.results);
    setSelectedWard(undefined);
    setSelectedDistrict(selectedOption.district_name);
  };
  const onSelectWard = (selectedOption) => {
    setSelectedWard(selectedOption.ward_name);
  };
  return (
    <>
      <form className="space-y-12">
        <div>
          <div className="md:flex gap-10 justify-between items-baseline mb-8 mt-12">
            <h1 className="text-3xl font-bold pb-2 md:pb-0 ">
              Thông tin vận chuyển
            </h1>
            {/* <div className="text-sm ">
              Bạn đã có tài khoản?{" "}
              <Link className="text-blue-600" to={"./login"}>
                Đăng nhập ngay
              </Link>
            </div> */}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="md:col-span-3 flex flex-col sm:flex-row gap-5">
              <input
                type="text"
                placeholder="Họ tên"
                className="input input-bordered h-10 rounded-2xl w-full focus:outline-none focus:ring-1 ring-blue-500 placeholder:text-sm"
              />
              <input
                type="phone"
                placeholder="Số điện thoại"
                className="input input-bordered h-10 rounded-2xl w-full focus:outline-none focus:ring-1 ring-blue-500 placeholder:text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered h-10 rounded-2xl focus:outline-none  focus:ring-1 ring-blue-500 placeholder:text-sm md:col-span-3"
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              className="input input-bordered h-10 rounded-2xl focus:outline-none  focus:ring-1 ring-blue-500 placeholder:text-sm md:col-span-3"
            />

            <AddressBox
              placeHolder={
                selectedProvince ? selectedProvince : "Chọn Tỉnh/Thành"
              }
              options={provinces}
              onSelect={onSelectProvince}
            />

            <AddressBox
              placeHolder={
                selectedDistrict ? selectedDistrict : "Chọn Quận/Huyện"
              }
              options={districts}
              onSelect={onSelectDistrict}
            />

            <AddressBox
              placeHolder={selectedWard ? selectedWard : "Chọn Phường/Xã"}
              options={wards}
              onSelect={onSelectWard}
            />
            <input
              type="text"
              placeholder="Ghi chú thêm (Ví dụ: Giao hàng giờ hành chính)"
              className="input input-bordered h-10 rounded-2xl focus:outline-none  focus:ring-1 ring-blue-500 placeholder:text-sm md:col-span-3"
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-8">Hình thức thanh toán</h1>
          <RadioGroup value={selectedMethod} onChange={setSelectedMethod}>
            <div className="space-y-6">
              {paymentMethods.map((option) => (
                <RadioGroup.Option
                  key={option.method}
                  value={option.method}
                  className="ui-checked:opacity-100 ui-checked:ring-blue-600 ring-slate-300 opacity-60 hover:ring-blue-600 hover:opacity-100 ring-1 rounded-2xl px-5 py-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-6">
                    {selectedMethod === option.method ? (
                      <MdOutlineRadioButtonChecked className="ui-checked:text-blue-600 text-xl flex-shrink-0" />
                    ) : (
                      <MdOutlineRadioButtonUnchecked className="text-xl group-hover:text-blue-600 flex-shrink-0" />
                    )}
                    <img src={option.img} alt="" className="h-9 w-9" />
                    <div>
                      <RadioGroup.Label as="p">
                        {option.method}
                      </RadioGroup.Label>
                      <RadioGroup.Description as="p" className="text-sm">
                        {option.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </form>
    </>
  );
}

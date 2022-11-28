import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Form } from "react-router-dom";
import axios from "axios";

import AddressBox from "./AddressBox";
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from "react-icons/md";
const paymentMethods = [
  {
    name: "COD",
    method: "COD",
    description: "Thanh toán khi nhận hàng",
    img: "https://www.coolmate.me/images/COD.svg",
  },
  {
    name: "Thanh toán MoMo",
    method: "MOMO",
    img: "https://www.coolmate.me/images/momo-icon.png",
  },
  {
    name: "Ví điện tử ZaloPay",
    method: "ZaloPay",
    img: "https://www.coolmate.me/images/logo-zalopay.svg",
  },
  {
    name: "Ví ShopeePay",
    method: "ShopeePay",
    img: "https://mcdn.coolmate.me/image/September2021/195dbf69c0ac36f26fbd_(1).png",
    description:
      "Giảm thêm 50k cho khách hàng lần đầu mở ví và thanh toán bằng ShopeePay",
  },
  {
    name: "Thẻ ATM / Internet Banking",
    method: "ATM / Internet Banking",
    img: "https://www.pngrepo.com/png/269904/512/debit-card-credit-card.png",

    description: "Thẻ tín dụng (Credit card) / Thẻ ghi nợ (Debit card)",
  },
];

export default function ShippingForm({ provinces }) {
  const [selectedProvince, setSelectedProvince] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [selectedWard, setSelectedWard] = useState();
  const [selectedMethod, setSelectedMethod] = useState(
    paymentMethods[0].method
  );
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
    <Form method="post"  className="space-y-12">
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
              name="name"
              className="input input-bordered h-10 rounded-2xl w-full focus:outline-none focus:ring-1 ring-blue-500 placeholder:text-sm"
            />
            <input
              placeholder="Số điện thoại"
              name="phone"
              className="input input-bordered h-10 rounded-2xl w-full focus:outline-none focus:ring-1 ring-blue-500 placeholder:text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="input input-bordered h-10 rounded-2xl focus:outline-none  focus:ring-1 ring-blue-500 placeholder:text-sm md:col-span-3"
          />
          <input
            type="text"
            placeholder="Địa chỉ"
            name="address"
            className="input input-bordered h-10 rounded-2xl focus:outline-none  focus:ring-1 ring-blue-500 placeholder:text-sm md:col-span-3"
          />

          <AddressBox
            name={"province"}
            placeHolder={
              selectedProvince ? selectedProvince : "Chọn Tỉnh/Thành"
            }
            options={provinces}
            onSelect={onSelectProvince}
          />

          <AddressBox
            name={"district"}
            placeHolder={
              selectedDistrict ? selectedDistrict : "Chọn Quận/Huyện"
            }
            options={districts}
            onSelect={onSelectDistrict}
          />

          <AddressBox
            name={"ward"}
            placeHolder={selectedWard ? selectedWard : "Chọn Phường/Xã"}
            options={wards}
            onSelect={onSelectWard}
          />
          <input
            name="note"
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
                key={option.name}
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
                    <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
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
      {/* <button className="w-full flex justify-center items-center bg-black rounded-2xl text-white py-4">
        Thanh toán ({selectedMethod})
      </button> */}
    </Form>
  );
}

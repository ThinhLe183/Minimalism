import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Link } from "react-router-dom";

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
  const onSelectProvince = (selectedOption) => {
    const provinceInstance = provinces.find(
      (province) => province.name === selectedOption
    );
    setSelectedDistrict(undefined);
    setSelectedProvince(provinceInstance);
  };
  const onSelectDistrict = (selectedOption) => {
    console.log(selectedProvince.districts);

    const districtInstance = selectedProvince.districts.find(
      (district) => district.name === selectedOption
    );

    setSelectedDistrict(districtInstance);
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
            {/* <select
              onChange={(e) => onSelectProvince(e)}
              className="select select-bordered  focus:outline-none rounded-2xl text-sm font-normal   transition-all"
            >
              <option value="">Chọn Tỉnh/Thành</option>
              {provinces.map((province) => (
                <option
                  className=""
                  key={province.code}
                  value={province.codename}
                >
                  {province.name}
                </option>
              ))}
            </select> */}
            {/* <Listbox
              onChange={(selectedOption) => onSelectProvince(selectedOption)}
              as="div"
              className={"relative"}
            >
              <Listbox.Button className=" ring-1 ring-primary ui-open:ring-0 z-10 py-1 pl-4 pr-1 rounded-xl  text-start flex justify-between items-center transition-all ui-open:rounded-b-none ui-open:bg-[#e3e3e3]">
                <div>
                  {selectedProvince ? selectedProvince.name : "Chọn Tỉnh/Thành"}
                </div>
                <RiArrowDropRightLine className="text-xl transition-all ui-open:rotate-90" />
              </Listbox.Button>
              <Listbox.Options className="absolute top-7 shadow-lg  bg-white rounded-b-xl max-h-96 overflow-auto z-10">
                {provinces.map((province) => (
                  <Listbox.Option
                    key={province.code}
                    value={province.codename}
                    className="pl-4 hover:bg-[#e3e3e3] cursor-pointer"
                  >
                    {province.name}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox> */}
            <AddressBox
              placeHolder={
                selectedProvince ? selectedProvince.name : "Chọn Tỉnh/Thành"
              }
              options={provinces}
              onSelect={onSelectProvince}
            />
            {/* <select
              onChange={(selectedOption) => onSelectDistrict(selectedOption)}
              className="select select-bordered focus:outline-none rounded-2xl text-sm font-normal"
            >
              <option value="">Chọn Quận/Huyện</option>

              {!!selectedProvince &&
                selectedProvince.districts.map((district) => (
                  <option key={district.code} value={district.codename}>
                    {district.name}
                  </option>
                ))}
            </select> */}
            <AddressBox
              placeHolder={
                selectedDistrict ? selectedDistrict.name : "Chọn Quận/Huyện"
              }
              options={selectedProvince ? selectedProvince.districts : []}
              onSelect={onSelectDistrict}
            />
            {/* <select className="select select-bordered focus:outline-none rounded-2xl text-sm font-normal">
              <option value="">Chọn Phường/Xã</option>
              {!!selectedDistrict &&
                selectedDistrict.wards.map((ward) => (
                  <option value={ward.codename} key={ward.code}>
                    {ward.name}
                  </option>
                ))}
            </select> */}
            <AddressBox
              placeHolder={selectedWard ? selectedWard : "Chọn Phường/Xã"}
              options={selectedDistrict ? selectedDistrict.wards : []}
              onSelect={setSelectedWard}
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

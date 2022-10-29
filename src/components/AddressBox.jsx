import React from "react";
import { Listbox } from "@headlessui/react";
import { RiArrowDropRightLine } from "react-icons/ri";

export default function AddressBox({ placeHolder, options, onSelect }) {
  return (
    <Listbox
      onChange={(selectedOption) => onSelect(selectedOption)}
      as="div"
      className={"relative w-full transition-all"}
    >
      <Listbox.Button className="w-full h-10 ring-1 ring-opacity-20 ring-primary ui-open:ring-0 z-10 px-4 rounded-2xl flex justify-between items-center ui-open:rounded-b-none ui-open:bg-[#e3e3e3]">
        <div>{placeHolder}</div>
        <RiArrowDropRightLine className="text-xl  duration-300 ui-open:rotate-90" />
      </Listbox.Button>
      <Listbox.Options className="absolute inset-x-0 shadow-lg bg-white rounded-b-xl max-h-64 overflow-auto z-10">
        {options.length === 0 ? (
          <Listbox.Option
            disabled={true}
            className="pl-4  cursor-not-allowed w-full py-2"
          >
            Không có kết quả
          </Listbox.Option>
        ) : (
          options.map((option) => (
            <Listbox.Option
              key={option.code}
              value={option.name}
              className="pl-4 hover:bg-[#e3e3e3] cursor-pointer w-full"
            >
              {option.name}
            </Listbox.Option>
          ))
        )}
      </Listbox.Options>
    </Listbox>
  );
}

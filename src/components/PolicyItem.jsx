import React from "react";

export default function PolicyItem({ img, line1, line2 }) {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-[33%] pt-3">
      <img src={img} alt="" />
      <span className="text-xs text-center opacity-90">
        {line1}
        <br />
        {line2}
      </span>
    </div>
  );
}

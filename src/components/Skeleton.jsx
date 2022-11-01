import React from "react";

export default function Skeleton() {
  return (
    <div class="animate-pulse flex space-x-4 ">
      <div class="indicator rounded-2xl bg-gray-300 h-48 w-32">
        <div className="indicator-item h-6 w-6 rounded-full bg-gray-300 "></div>
      </div>
      <div class="relative flex-1 space-y-3 my-2">
        <div class="h-5 bg-gray-300 rounded-3xl w-5/6"></div>
        <div class="h-5 bg-gray-300 rounded-3xl w-1/3"></div>
        <div className="absolute h-5 bottom-0 right-0 bg-gray-300 rounded-3xl w-20"></div>
      </div>
    </div>
  );
}

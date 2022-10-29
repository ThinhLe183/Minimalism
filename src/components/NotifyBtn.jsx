import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";

export default function NotifyBtn() {
  return (
    <div className="dropdown dropdown-end  ">
      <label
        tabIndex={0}
        className="btn btn-sm btn-ghost btn-circle hover:scale-125 transition-all"
      >
        <IoNotificationsOutline className="text-xl" />
      </label>
      <div
        tabIndex={0}
        className="mt-5 card card-compact dropdown-content w-52 bg-base-100 shadow-2xl rounded-2xl"
      >
        <div className="card-body h-32 flex items-center justify-center">
          <div>There's no notification yet</div>
        </div>
      </div>
    </div>
  );
}

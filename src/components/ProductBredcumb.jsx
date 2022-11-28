import React from "react";
import { Link } from "react-router-dom";

export default function ProductBredcumb({ name, color }) {
  return (
    <div className="text-xs breadcrumbs pb-5">
      <ul className="">
        <li className="opacity-80">
          <Link to={"../../"}>Home</Link>
        </li>
        <li className="opacity-80">
          <Link>Shop</Link>
        </li>
        <li className="text-sm">
          {name} ({color})
        </li>
      </ul>
    </div>
  );
}

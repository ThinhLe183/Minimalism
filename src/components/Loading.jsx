import React from "react";
import { ScaleLoader } from "react-spinners";
export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <ScaleLoader height={48} width={4} />
    </div>
  );
}

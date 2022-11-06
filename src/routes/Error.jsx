import React from "react";
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Error() {
  const error = useRouteError();
  console.log({ error });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex divide-x-2 space-x-5">
        <div className="text-6xl">404</div>
        <div className="pl-5">
          <div className="text-2xl">{error.message}</div>
          <div className="text-gray-500 font-normal">
            Please check the Url in the address bar and try again
          </div>
          <div className="flex w-2/3 justify-start space-x-3 pt-5">
            <Link className="btn btn-primary rounded-2xl" to={".."}>
              Go back home
            </Link>
            <Link className="btn btn-outline rounded-2xl hover:bg-slate-400">
              Contact support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

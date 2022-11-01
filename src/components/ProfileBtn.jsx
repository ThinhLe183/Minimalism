import React from "react";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
export default function ProfileBtn({ user }) {
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <div className="dropdown dropdown-end ">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img src={user.photoURL} alt="" />
        </div>
      </label>
      <div className="dropdown-content rounded-2xl bg-base-100  w-64 overflow-hidden divide-y shadow-2xl mt-3">
        <div className=" p-2 flex gap-2 items-center">
          <img src={user.photoURL} className="w-12 rounded-full" alt="" />
          <div className="text-sm">
            <p className="font-medium">{user.displayName}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-compact ">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <a>Settings</a>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

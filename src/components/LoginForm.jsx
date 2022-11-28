import React from "react";
import { useLoadingStore } from "../state_management/store";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, googleProvider, facebookProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
export default function LoginForm() {
  const { setIsLoading, isLoading } = useLoadingStore((state) => state);
  const handleLogin = async (Provider) => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, Provider);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex justify-center items-center  h-screen bg-login-img bg-no-repeat bg-cover">
      <div className="h-[20rem] w-[29rem] flex flex-col justify-center items-center bg-white drop-shadow-2xl shadow-xl rounded-xl opacity-90 px-20">
        <div className="pb-8 text-2xl">Đăng nhập</div>
        <button
          className={`bg-[#0572E6] text-white px-24 py-2 text-2xl rounded-lg drop-shadow-lg shadow-lg hover:opacity-75 ${
            isLoading ? "hover:cursor-wait" : ""
          }`}
          onClick={() => handleLogin(facebookProvider)}
          disabled={isLoading}
        >
          <FaFacebookF />
        </button>
        <div className="divider">or</div>
        <button
          className="bg-white text-white px-24 py-2 text-2xl rounded-lg drop-shadow-lg shadow-lg hover:bg-slate-100"
          onClick={() => handleLogin(googleProvider)}
          disabled={isLoading}
        >
          <FcGoogle />
        </button>
      </div>
    </div>
  );
}

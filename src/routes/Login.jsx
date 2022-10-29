import React from "react";
import LoginForm from "../components/LoginForm";
import { useUserStore } from "../state_management/store";
import { Navigate } from "react-router-dom";
export default function Login() {
  const { user } = useUserStore((state) => state);
  return (
    <div>
      {user && <Navigate to={"/"} />}
      <LoginForm />
    </div>
  );
}

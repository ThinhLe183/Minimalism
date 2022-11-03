import React from "react";
import LoginForm from "../components/LoginForm";
import { useStore } from "../state_management/store";
import { Navigate } from "react-router-dom";
export default function Login() {
  const user = useStore((state) => state.user);
  return (
    <div>
      {user && <Navigate to={"/"} />}
      <LoginForm />
    </div>
  );
}

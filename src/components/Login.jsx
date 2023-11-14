import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login as authLogin } from "../Feature/authSlice";
import { Button, Input, Logo } from "./index";
import authservice from "../appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
function Login() {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState();

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);

      if (session) {
        const userData = await authservice.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const loginWithGoogle = async () => {
    setError("");
    try {
      const googleLogin = await authservice.createOAuthAccount();
      if (googleLogin) {
        const data = await authservice.getCurrentUser();
        if (data) {
          dispatch(authLogin(googleLogin));
          navigate("/");
        }
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 ">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && (
          <div className="bg-red-200 border border-red-400  px-4 py-3  text-sm text-center ">
            <span className="block sm:inline ">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: test@gmail.com"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />

            <Input
              label="Password: 12345678"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full p-3 border hover:duration-200 "
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

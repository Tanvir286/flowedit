/** @format */
"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      router.replace("/pricing");
    }
  }, [token, router]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [login, { isLoading }] = useLoginMutation();


  const onSubmit = async (data: LoginFormData) => {
 
    try {
      const result = await login(data).unwrap();
      // console.log('===================================='); 

      // Ensure role is either USER or ADMIN
      const role = result.type === "ADMIN" ? "ADMIN" : "USER";

      // Save auth state in Redux and Cookies
      dispatch(
        setCredentials({
          token: result.authorization?.access_token ?? null,
          role,
          isTrial: (result as any).isTrial ?? false,
          isSubscribed: (result as any).isSubscribed ?? false,
        })
      );

      toast.success("Login successful");

      // Redirect based on role
      setTimeout(() => {
        if (role === "ADMIN") {
          router.push("/pricing"); 
        } else {
          router.push("/pricing"); 
        }
      }, 800);
    } catch (err: unknown) {
      let message = "Email or password is incorrect";

      if (typeof err === "object" && err !== null && "status" in err) {
        const fetchError = err as FetchBaseQueryError;

        if (
          fetchError.data &&
          typeof fetchError.data === "object" &&
          "message" in fetchError.data
        ) {
          const backendMessage = (fetchError.data as { message: unknown })
            .message;

          message =
            typeof backendMessage === "string"
              ? backendMessage
              : "Email or password is incorrect";
        }
      }

      toast.error(message);

      // Optional: redirect to signup after failed login
      setTimeout(() => {
        router.push("/signup");
      }, 1200);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-blue-500 via-indigo-400 to-blue-200" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-gray-600">
          Login with your email & password
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-lg px-4 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                className="w-full border rounded-lg px-4 py-2 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
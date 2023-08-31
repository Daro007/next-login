"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserContext } from "../context/UserContext";

export default function Login() {

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const { login } = useUserContext();
  // console.log("user from context", user);

  interface FormData {
    username: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // console.log("data", data);
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post(`${apiUrl}auth/token/`, body, {
        headers: headers,
      });
      console.log("Login data",response.data);
      
      localStorage.setItem("username", response?.data?.username);
      localStorage.setItem("access_token", response?.data?.access_token);
      login(response?.data?.username)
      router.push("/profile");
    } catch (error) {
      setApiResponse("Incorrect email or password");
      console.error("Log in failed:", error);
    }
  };
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Log in now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label htmlFor="username" className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  {...register("username", {
                    required: "A username is required",
                  })}
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <p className="text-red-500 text-sm mt-2">
                    A username is required.
                  </p>
                )}
              </div>
              <div className="form-control">
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  {...register("password", {
                    required: "required",
                    minLength: {
                      value: 5,
                      message: "min length is 5",
                    },
                  })}
                  autoComplete="current-password"
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm mt-2" role="alert">
                    {errors.password.message}
                  </span>
                )}

                {apiResponse && (
                  <Link
                    className="label-text-alt link link-hover"
                    href="/login"
                  >
                    {" "}
                    <span className="text-red-500 text-sm mt-2" role="alert">
                      {apiResponse}
                    </span>
                  </Link>
                )}
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

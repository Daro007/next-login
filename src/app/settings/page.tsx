"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Settings() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("Username");

  useEffect(() => {
    const usernameLoggedIn = localStorage.getItem("usernameLoggedIn");
    console.log("usernameLoggedIn", usernameLoggedIn);
    if (usernameLoggedIn === "false") {
      router.push("/");
    }
    const username_from_storage = localStorage.getItem("username")
      ? (localStorage.getItem("username") as string)
      : "";
    setUsername(username_from_storage);
  }, []);

  return (
    <div className="hero min-h-screen">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 text-5xl font-bold">{username}</h1>
          <p className="mb-5">
            TO DO: Change username
          </p>
          <select className="select select-info w-full max-w-xs">
            <option disabled selected>
              Select language
            </option>
            <option>English</option>
            <option>Italian</option>
          </select>
          <input type='submit' className="btn btn-primary" value="Save preferences" />
        </div>
      </div>
    </div>
  );
}

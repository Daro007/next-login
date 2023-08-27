"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FontSizeChanger from "../components/FontSizeChanger";

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("Username");

  const [fontSize, setFontSize] = useState<number>(16);

  const handleFontSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newSize = parseInt(event.target.value);
    setFontSize(newSize);
  };

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
          <h1 className="mb-5 text-5xl font-bold" style={{ fontSize: `${fontSize}px` }}>Welcome {username} !</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <FontSizeChanger
            fontSizeOptions={[12, 16, 20]}
            selectedSize={fontSize}
            onChange={handleFontSizeChange}
          />
          <button type="submit" className="btn btn-error">
            Delete account{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

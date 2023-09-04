"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";


const UsernameChanger: React.FC = () => {
  //   console.log("username PROP", username);

  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const router = useRouter();

  const { user, logout } = useUserContext();

  const [apiResponse, setApiResponse] = useState("");

  const handleDeleteUser = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.delete(
        `${apiUrl}users/${user}/`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      logout()
      localStorage.removeItem("selectedLanguage");
      localStorage.removeItem("access_token");
      localStorage.removeItem("fontSize");
      router.push("/");
    } catch (error) {
      setApiResponse("Something went wrong. Try again later");
      console.error("Delete user failed:", error);
    }
  };
  return (
    <div>
      <button onClick={() => handleDeleteUser()} className="btn bg-red-600">
        Delete account
      </button>
      {apiResponse && (
        <p className="text-white text-sm mt-2" role="alert">
          {apiResponse}
        </p>
      )}
    </div>
  );
};

export default UsernameChanger;

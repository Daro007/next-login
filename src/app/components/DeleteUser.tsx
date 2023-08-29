"use client";
import React, { useState } from "react";
import axios from "axios";

interface UsernameChangerProps {
  username: string;
}

const UsernameChanger: React.FC<UsernameChangerProps> = ({ username }) => {
  //   console.log("username PROP", username);

  const [apiResponse, setApiResponse] = useState("");

  const handleDeleteUser = async () => {
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };

    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/users/${username}/delete`,
        {
          headers: headers,
        }
      );
      console.log(response.data);
    } catch (error) {
      setApiResponse("Something went wrong. Try again later");
      console.error("Log in failed:", error);
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

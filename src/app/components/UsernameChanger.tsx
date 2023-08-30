"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useUserContext } from "../context/UserContext";


const UsernameChanger: React.FC = () => {

  interface FormData {
    newUsername: string;
  }

  const [newUsername, setNewUsername] = useState("");
  const [apiResponse, setApiResponse] = useState("");

  const { user, login } = useUserContext();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async () => {

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    };
    const body = {
      username: user,
      new_username: newUsername,
    };

    // console.log("body", body);

    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/users/${user}/modify-username/?new_username=${newUsername}`,
        body,
        {
          headers: headers,
        }
      );
      console.log(response.data);
      login(response?.data?.new_username)
      localStorage.setItem("username", response?.data?.new_username);
    } catch (error) {
      setApiResponse("Incorrect email or password");
      console.error("Log in failed:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label htmlFor="newUsername" className="label">
            Change your username:
          </label>
          <input
            {...register("newUsername", {
              required: "A username is required",
            })}
            name="newUsername"
            type="text"
            autoComplete="newUsername"
            placeholder="New Username"
            className="input input-bordered"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          {errors.newUsername && (
            <p className="text-white text-sm mt-2">A username is required.</p>
          )}
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-neutral">Change username </button>
        </div>
      </form>
      {apiResponse && (
        <span className="text-red-500 text-sm mt-2" role="alert">
          {apiResponse}
        </span>
      )}
    </div>
  );
};

export default UsernameChanger;

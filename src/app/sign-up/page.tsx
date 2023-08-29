"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from "react-hook-form";

export default function SignUp() {

  const router = useRouter()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apiResponse, setApiResponse] = useState('');


  interface FormData {
    username: string
    email: string,
    password: string
  }

  const { register, handleSubmit, watch, formState: { errors }, } = useForm<FormData>();

  

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log("data", data)
    const headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
    const body = {
      username: username,
      email: email,
      password: password
    }

    try { 
      const response = await axios.post('http://127.0.0.1:8000/users/', body, { headers: headers })
      console.log(response.data)
      router.push("/login")
    } catch (error) {
      setApiResponse("Looks like you already have an account. Go to Login")
      console.error('Signup failed:', error);
    }
  }

  

    return (
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign up now!</h1>
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
                    {...register("username", { required: "A username is required" })}
                    name='username'
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
                  <label htmlFor="email" className={`label ${errors.email ? "text-red-400" : "text-purple-400"}`} >
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                      }
                    })}
                    autoComplete="email"
                    name='email'
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2">
                      A valid email is required.
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
                        message: "min length is 5"
                      }
                    })}
                    autoComplete="current-password"
                    name='password'
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && <span className="text-red-500 text-sm mt-2" role="alert">{errors.password.message}</span>}
                  <label className="label">
                    <Link className="label-text-alt link link-hover" href="/login"> Already have an account?  Log in</Link>
                  </label>
                  {apiResponse && <Link className="label-text-alt link link-hover" href="/login"> <span className="text-red-500 text-sm mt-2" role="alert">{apiResponse}</span></Link>}
                </div>
                <div className="form-control mt-6">
                  <input type='submit' className="btn btn-primary" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
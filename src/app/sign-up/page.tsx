"use client"
import React, { useState } from 'react';
import Link from 'next/link'
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function SignUp() {

  const router = useRouter()

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {

    const headers = {
      'Content-Type': 'application/json',
      // 'Authorization': 'JWT fefege...'
    }
    const body = {
      username: username,
      email: email,
      password: password
    }

    try {
      // Make a POST request to your backend API to create a new user
      const response = await axios.post('http://127.0.0.1:8000/users/', body, {headers})
      console.log(response.data)
      router.push("/profile")
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

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
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <Link className="label-text-alt link link-hover" href="/login"> Already have an account?  Log in</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleSignup} className="btn btn-primary">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/UserContext";

function Navbar() {
  const router = useRouter();

  const { user, logout } = useUserContext();
  // console.log("user from context", user);

  function handleLogOut() {
    logout()
    router.push("/");
  }


  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link
          className="btn btn-ghost normal-case text-xl"
          href="/"
          aria-label="Homepage"
        >
          CompanyName
        </Link>
      </div>
      {!user ? (<div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/login">Log in</Link>
          </li>
          <li>
            <Link href="/sign-up">Sign up</Link>
          </li>
        </ul>
      </div> ) : (
        ""
      )}
      {user ? (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src="/account.png"
                  alt="test"
                  fill={true}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  href="/profile"
                  aria-label="profile"
                  className="justify-between"
                >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleLogOut()}
                  aria-label="user settings"
                  className="justify-between"
                >
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Navbar;

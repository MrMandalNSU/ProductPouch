"use client";

import { useState } from "react";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login clicked with:", { email, password });
  };

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <div className="relative flex flex-col items-center">
        <h2 className="text-3xl font mb-4 text-black">SIGN IN</h2>

        {/* Login Box */}
        <div className="bg-white p-15 border border-gray-300 shadow-md w-100">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded mb-4 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded mb-6 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-25 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded transition mx-auto block"
            >
              LOGIN
            </button>
          </form>
          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="/signup" className="text-blue-500 font-semibold">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

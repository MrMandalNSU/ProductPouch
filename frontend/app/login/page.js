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
      <div className="bg-white p-10 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">SIGN IN</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold p-3 rounded transition"
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
  );
}

"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
  };

  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-sm p-6 rounded-xl mt-25">
          <h1 className="text-6xl font-bold text-center mb-10">Create Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-2 rounded-xl bg-teal-50 placeholder:text-gray-600 outline-none" 
            />
            <input 
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-2 rounded-xl bg-teal-50 placeholder:text-gray-600 outline-none" 
            />
            {/* Input Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-teal-50 placeholder:text-gray-600 outline-none"
            />

            {/* Input Password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-teal-50 placeholder:text-gray-600 outline-none"
            />

            {/* Forgot Password */}
            <div className="text-sm">
              <a href="#" className="text-gray-700 hover:underline">
                Remember Me
              </a>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Create Account
              </button>
              <Link href="/Authentication/Login/">
                <button
                  type="button"
                  className="border border-teal-500 text-teal-600 px-6 py-2 rounded-full hover:bg-black hover:text-white hover:border-none transition"
                >
                  Sign In
                </button>
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

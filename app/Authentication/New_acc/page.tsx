"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Link from "next/link";
import { Keyboard } from "lucide-react";

export default function CreateAccountPage() {
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(0);

  const slides = [
    { type: "text", content: "Your keyboard journey starts here." },
    { type: "text", content: "Craft. Customize. Express yourself." },
    { type: "icon" },
    { type: "text", content: "Join the custom keyboard culture." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevSlide(slide);
      setSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [slide]);

  return (
    <div className="min-h-screen bg-teal-100">
      <Header />

      <main className="flex h-[calc(100vh-120px)]">
        {/* LEFT PANEL – CREATE ACCOUNT */}
        <div className="w-2/5 flex items-center justify-center">
          <div className="w-full max-w-sm p-6">
            <h1 className="text-6xl font-bold mb-10">Create Account</h1>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 rounded-xl bg-teal-50 outline-none"
              />

              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-2 rounded-xl bg-teal-50 outline-none"
              />

              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 rounded-xl bg-teal-50 outline-none"
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-xl bg-teal-50 outline-none"
              />

              <div className="text-sm text-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="accent-black" />
                  Remember Me
                </label>
              </div>

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
                    className="border border-teal-500 text-teal-600 px-6 py-2 rounded-full hover:bg-black hover:text-white transition"
                  >
                    Sign In
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT PANEL – SHOWCASE (HEIGHT LEBIH KECIL) */}
        <div className="w-3/5 flex items-center justify-center">
          <div className="h-[75%] w-full bg-white relative overflow-hidden rounded-tl-4xl rounded-bl-4xl flex flex-col items-center justify-center">
            {/* SLIDES */}
            {slides.map((item, index) => {
              const isActive = index === slide;
              const isPrev = index === prevSlide;

              return (
                <div
                  key={index}
                  className={`
                    absolute flex items-center justify-center
                    transition-all duration-700 ease-in-out
                    ${isActive ? "translate-x-0 opacity-100" : ""}
                    ${isPrev ? "-translate-x-full opacity-0" : ""}
                    ${
                      !isActive && !isPrev
                        ? "translate-x-full opacity-0"
                        : ""
                    }
                  `}
                >
                  {item.type === "text" && (
                    <p className="text-4xl font-semibold text-black max-w-md text-center px-10">
                      {item.content}
                    </p>
                  )}

                  {item.type === "icon" && (
                    <Keyboard size={140} className="text-black" />
                  )}
                </div>
              );
            })}

            {/* INDICATOR */}
            <div className="absolute bottom-8 flex gap-3">
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === slide ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

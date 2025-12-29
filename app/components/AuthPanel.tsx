"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/Client";

interface AuthPanelProps {
  isOpen: "login" | "signup" | "reset" | null;
  setIsOpen: (state: "login" | "signup" | "reset" | null) => void;
}

export default function AuthPanel({ isOpen, setIsOpen }: AuthPanelProps) {
  const router = useRouter();

  // ===== STATE =====
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== LOGIN =====
  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (!data.user?.email_confirmed_at) {
      setError("Please verify your email before logging in.");
      return;
    }

    setIsOpen(null);
    router.push("/Dashboard");
  };

  // ===== SIGN UP =====
  const handleSignup = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    // 🔥 CREATE PROFILE ON SIGNUP
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: fullName,
        country: "Indonesia",
      });
    }

    setError("Account created! Please check your email to verify.");
    setIsOpen("login");
  };

  // ===== RESET PASSWORD =====
  const handleReset = async () => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    setError("Reset link sent to your email.");
    setIsOpen("login");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "50%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-95 max-w-full p-6 flex flex-col 
            ${isOpen === "reset" ? "bg-teal-100 rounded-3xl" : "bg-teal-100 rounded-3xl shadow-2xl"}`}
        >
          {error && (
            <p className="text-sm text-red-600 mb-2 text-center">{error}</p>
          )}

          {isOpen !== "reset" && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-full transition ${
                  isOpen === "login"
                    ? "bg-black text-white font-semibold"
                    : "bg-teal-600 text-white hover:bg-white hover:text-black"
                }`}
                onClick={() => setIsOpen("login")}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-full transition ${
                  isOpen === "signup"
                    ? "bg-black text-white font-semibold"
                    : "bg-teal-600 text-white hover:bg-white hover:text-black"
                }`}
                onClick={() => setIsOpen("signup")}
              >
                Create Account
              </button>
            </div>
          )}

          <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
            {isOpen === "login" && (
              <>
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-white outline-none" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full bg-white outline-none" onChange={(e) => setPassword(e.target.value)} />

                <button onClick={() => setIsOpen("reset")} className="text-sm text-black underline text-left">
                  Forgot Password
                </button>

                <button disabled={loading} onClick={handleLogin} className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition">
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </>
            )}

            {isOpen === "signup" && (
              <>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-full bg-white outline-none" onChange={(e) => setFullName(e.target.value)} />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-white outline-none" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full bg-white outline-none" onChange={(e) => setPassword(e.target.value)} />

                <button disabled={loading} onClick={handleSignup} className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition">
                  Create Account
                </button>
              </>
            )}

            {isOpen === "reset" && (
              <>
                <h3 className="text-center font-bold text-3xl mb-4 text-black">Reset Password</h3>
                <hr className="mb-4" />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-white outline-none" onChange={(e) => setEmail(e.target.value)} />
                <button disabled={loading} onClick={handleReset} className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition">
                  Send Reset Link
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

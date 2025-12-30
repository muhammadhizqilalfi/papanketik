"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface AuthPanelProps {
  isOpen: "login" | "signup" | "reset" | "change-email" | null;
  setIsOpen: (
    state: "login" | "signup" | "reset" | "change-email" | null
  ) => void;
}

export default function AuthPanel({ isOpen, setIsOpen }: AuthPanelProps) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ===== LOGIN =====
  const handleLogin = async () => {
    if (!email || !password) return setError("Email and password required");

    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    // ambil session untuk cek role
    const sessionRes = await fetch("/api/auth/session");
    const sessionData = await sessionRes.json();

    const role = sessionData?.user?.role || "user";

    setIsOpen(null);
    if (role === "admin") router.replace("/admin/dashboard");
    else router.replace("/Dashboard");
  };

  // ===== SIGNUP =====
  const handleSignup = async () => {
    if (!email || !password || !fullName)
      return setError("Please fill all fields");

    setLoading(true);
    setError(null);

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });

    let data: { error?: string } | null = null;
    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse signup response:", err);
    }

    if (!res.ok) {
      setLoading(false);
      setError(data?.error || "Signup failed");
      return;
    }

    // auto login
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (loginRes?.error) {
      setError("Account created. Please login.");
      setIsOpen("login");
      return;
    }

    setIsOpen(null);
    router.replace("/Dashboard");
  };

  // ===== RESET PASSWORD =====
  const handleReset = async () => {
    if (!email) return setError("Enter your email to reset password");

    setLoading(true);
    setError(null);

    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || "Reset failed");
      return;
    }

    setError("Reset link sent! Check your email.");
    setIsOpen("login");
  };

  // ===== CHANGE EMAIL =====
  const handleChangeEmail = async () => {
    if (!newEmail) return setError("Enter new email");

    setLoading(true);
    setError(null);

    const res = await fetch("/api/change-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || "Failed to change email");
      return;
    }

    setError("Verification sent to new email!");
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
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96 max-w-full p-6 flex flex-col bg-teal-100 rounded-3xl shadow-2xl"
        >
          {error && (
            <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
          )}

          {isOpen !== "reset" && isOpen !== "change-email" && (
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
            {/* LOGIN */}
            {isOpen === "login" && (
              <>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={() => setIsOpen("reset")}
                  className="text-sm text-black underline text-left"
                >
                  Forgot Password
                </button>
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </>
            )}

            {/* SIGNUP */}
            {isOpen === "signup" && (
              <>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setFullName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Create Account
                </button>
              </>
            )}

            {/* RESET PASSWORD */}
            {isOpen === "reset" && (
              <>
                <h3 className="text-center font-bold text-3xl mb-4 text-black">
                  Reset Password
                </h3>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={handleReset}
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
                <button
                  onClick={() => setIsOpen("login")}
                  className="text-sm underline mt-2 text-center"
                >
                  Back to Login
                </button>
              </>
            )}

            {/* CHANGE EMAIL */}
            {isOpen === "change-email" && (
              <>
                <h3 className="text-center font-bold text-3xl mb-4 text-black">
                  Change Email
                </h3>
                <input
                  type="email"
                  placeholder="New Email"
                  className="w-full px-4 py-3 rounded-full bg-white outline-none"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <button
                  onClick={handleChangeEmail}
                  disabled={loading}
                  className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  {loading ? "Sending..." : "Send Verification"}
                </button>
                <button
                  onClick={() => setIsOpen("login")}
                  className="text-sm underline mt-2 text-center"
                >
                  Back to Login
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

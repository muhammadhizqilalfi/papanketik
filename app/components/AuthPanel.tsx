"use client";
import { AnimatePresence, motion } from "framer-motion";

interface AuthPanelProps {
  isOpen: "login" | "signup" | "reset" | null;
  setIsOpen: (state: "login" | "signup" | "reset" | null) => void;
}

export default function AuthPanel({ isOpen, setIsOpen }: AuthPanelProps) {
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
          {/* Hanya tampilkan tombol login/signup jika bukan reset */}
          {isOpen !== "reset" && (
            <div className="flex justify-center gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-full transition ${
                  isOpen === "login" ? "bg-black text-white font-semibold" : "bg-teal-600 text-white hover:bg-white hover:text-black"
                }`}
                onClick={() => setIsOpen("login")}
              >
                Login
              </button>
              <button
                className={`px-4 py-2 rounded-full transition ${
                  isOpen === "signup" ? "bg-black text-white font-semibold" : "bg-teal-600 text-white hover:bg-white hover:text-black"
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
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-white outline-none" />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full bg-white outline-none" />
                <label className="flex items-center gap-2 text-sm text-black mt-1">
                  <input type="checkbox" className="w-4 h-4 rounded border-teal-500 focus:ring-teal-500" />
                  Remember Me
                </label>
                <button 
                  onClick={() => setIsOpen("reset")}
                  className="text-sm text-black underline text-left"
                >
                  Forgot Password
                </button>
                <button 
                  onClick={() => window.location.href = '/Dashboard'}
                  className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition"
                >
                  Sign In
                </button>
              </>
            )}

            {isOpen === "signup" && (
              <>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-full bg-white outline-none" />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-white outline-none" />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-full bg-white outline-none" />
                <button className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition">
                  Create Account
                </button>
              </>
            )}

            {isOpen === "reset" && (
              <>
                <h3 className="text-center font-bold text-3xl mb-4 text-black">Reset Password</h3>
                <hr className="mb-4" />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-full bg-white outline-none" />
                <button className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-white hover:text-black transition">
                  Send Reset Link
                </button>
                <button 
                  onClick={() => setIsOpen("login")}
                  className="text-sm text-black underline mt-2 text-center"
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

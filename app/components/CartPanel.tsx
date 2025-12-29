"use client";
import { motion, AnimatePresence } from "framer-motion";

interface CartPanelProps {
  isOpen: boolean;
}

export default function CartPanel({ isOpen }: CartPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-28 right-6 z-50 w-95 h-[calc(100vh-160px)]"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-6 h-full flex flex-col">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">Cart</h2>
              <div className="h-px bg-black/40 mt-2" />
            </div>
            <div className="flex flex-col gap-4 overflow-y-auto flex-1 pr-1">
              <div className="flex gap-4 items-start">
                <div className="w-16 h-16 bg-gray-300 rounded-xl shrink-0" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold">Product Name</p>
                  <p className="text-gray-500">$Price</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span>Qty</span>
                    <button className="px-2 py-0.5 rounded bg-gray-200">+</button>
                    <button className="px-2 py-0.5 rounded bg-gray-200">-</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full py-2 rounded-xl bg-red-400 text-black hover:bg-red-500 transition">
                Delete All
              </button>
              <button className="w-full py-2 rounded-xl bg-teal-200 text-black hover:bg-teal-300 transition">
                Checkout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

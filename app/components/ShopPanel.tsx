"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

interface ShopPanelProps {
  isOpen: boolean;
  menus: Record<string, { label: string; href: string }[]>;
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const word = {
  hidden: { opacity: 0, y: 10, x: 20 },
  visible: { opacity: 1, y: 0, x: 22 },
};

export default function ShopPanel({ isOpen, menus }: ShopPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-teal-100 shadow-xl z-50 rounded-b-4xl"
        >
          <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
            {Object.entries(menus).map(([key, items]) => (
              <div key={key}>
                {/* Title */}
                <motion.h3
                  className="mb-4 font-semibold text-lg capitalize flex flex-wrap gap-1"
                  variants={container}
                  initial="hidden"
                  animate="visible"
                >
                  {key.split(" ").map((wordText, i) => (
                    <motion.span key={i} variants={word}>
                      {wordText}
                    </motion.span>
                  ))}
                </motion.h3>

                {/* Menu items*/}
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="block px-4 py-2 rounded-full hover:bg-teal-700 hover:text-white transition">
                        <motion.span
                          className="flex flex-wrap gap-1"
                          variants={container}
                          initial="hidden"
                          animate="visible"
                        >
                          {item.label.split(" ").map((wordText, i) => (
                            <motion.span key={i} variants={word}>
                              {wordText}
                            </motion.span>
                          ))}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

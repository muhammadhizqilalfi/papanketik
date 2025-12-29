"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ShopPanelProps {
  isOpen: boolean;
  menus: Record<string, { label: string; href: string }[]>;
}

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
                <h3 className="mb-4 font-semibold text-lg capitalize">{key}</h3>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className="block px-4 py-2 rounded-full hover:bg-teal-700 hover:text-white transition">
                        {item.label}
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

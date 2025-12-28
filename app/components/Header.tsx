"use client";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  Search,
  User,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Header({ onSearch }: { onSearch?: (q: string) => void }) {
  const messages = [
    "Welcome to papanketik.",
    "Discover custom keyboards.",
    "Type your style, your way.",
  ];

  const [index, setIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const menus = {
    brands: [
      { label: "Qwertykeys", href: "/brands/qwertykeys" },
      { label: "KBDfans", href: "/brands/kbdfans" },
      { label: "MONOKEI", href: "/brands/monokei" },
      { label: "Neo", href: "/brands/neo" },
      { label: "Wuque Studio", href: "/brands/wuque" },
    ],
    layout: [
      { label: "60% and less", href: "/layout/60" },
      { label: "65%", href: "/layout/65" },
      { label: "70% and 75%", href: "/layout/75" },
      { label: "80% TKL", href: "/layout/tkl" },
      { label: "Full Size", href: "/layout/full" },
    ],
    category: [
      { label: "Pre-built Keyboard", href: "/category/prebuilt" },
      { label: "Hall Effect Keyboard", href: "/category/hall-effect" },
      { label: "Ergonomic Keyboard", href: "/category/ergonomic" },
      { label: "Keycaps", href: "/category/keycaps" },
      { label: "Switches", href: "/category/switches" },
    ],
    shop: [
      { label: "All Products", href: "/cataloguekey/" },
    ]
  };

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % messages.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full relative z-50">
      {/* Top Header */}
      <div className="bg-teal-700 text-white text-center text-sm h-20 overflow-hidden relative">
        <div
          key={index}
          className="animate-flip absolute w-full top-3 left-0"
        >
          {messages[index]}
        </div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-10 left-0 right-0 z-50 bg-teal-100 text-black px-6 py-3 flex items-center justify-between rounded-t-4xl">
        <Image
          src="/images/logo2.png"
          alt="Papanketik Logo"
          width={100}
          height={50}
        />

        <ul className="flex items-center gap-6 font-medium">
          <li>
            <Link href="/" className="relative px-6 py-2 hover:text-white group">
              <span className="absolute inset-0 bg-black rounded-full -z-10 opacity-0 group-hover:opacity-100 transition" />
              Home
            </Link>
          </li>

          <li>
            <button
              onClick={() => {
                setIsShopOpen((v) => !v);
                setIsSearchOpen(false);
              }}
              className="relative px-6 py-2 hover:text-white group flex items-center gap-1"
            >
              <span className="absolute inset-0 bg-black rounded-full -z-10 opacity-0 group-hover:opacity-100 transition" />
              Shop <ChevronDown size={14} />
            </button>
          </li>

          <li>
            <Link href="/support" className="relative px-6 py-2 hover:text-white group">
              <span className="absolute inset-0 bg-black rounded-full -z-10 opacity-0 group-hover:opacity-100 transition" />
              Support
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <Search
            className="cursor-pointer"
            onClick={() => {
              setIsSearchOpen((v) => !v);
              setIsShopOpen(false);
            }}
          />
          <Link href="/Authentication/Login/">
            <User className="cursor-pointer" />
          </Link>
          <ShoppingCart className="cursor-pointer" />
        </div>
      </nav>

      <div className="h-16" />

      {/* BLUR OVERLAY */}
      <AnimatePresence>
        {(isSearchOpen || isShopOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsSearchOpen(false);
              setIsShopOpen(false);
            }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* SEARCH PANEL */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-33 left-0 w-full bg-teal-100 shadow-xl z-50 rounded-b-4xl"
          >
            <div className="max-w-3xl mx-auto px-6 py-8">
              <input
                type="text"
                placeholder="Search for keyboards, accessories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                className="w-full px-5 py-3 text-lg rounded-full bg-white outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SHOP PANEL */}
      <AnimatePresence>
        {isShopOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-33 left-0 w-full bg-teal-100 shadow-xl z-50 rounded-b-4xl"
          >
            <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
              {Object.entries(menus).map(([key, items]) => (
                <div key={key}>
                  <h3 className="mb-4 font-semibold text-lg capitalize">
                    {key}
                  </h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          onClick={() => setIsShopOpen(false)}
                          className="block px-4 py-2 rounded-full hover:bg-teal-700 hover:text-white transition"
                        >
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
    </header>
  );
}

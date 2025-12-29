"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Search, User, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import AuthPanel from "./AuthPanel";
import SearchPanel from "./SearchPanel";
import ShopPanel from "./ShopPanel";
import CartPanel from "./CartPanel";

export default function Header({ onSearch }: { onSearch?: (q: string) => void }) {
  const messages = [
    "Welcome to papanketik.",
    "Discover custom keyboards.",
    "Type your style, your way.",
  ];

  const [index, setIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState<"login" | "signup" | null>(null);
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
    shop: [{ label: "All Products", href: "/cataloguekey/" }],
  };

  useEffect(() => {
    const interval = setInterval(() => setIndex((prev) => (prev + 1) % messages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const closeAllExcept = (panel: string) => {
    setIsSearchOpen(panel === "search" ? !isSearchOpen : false);
    setIsShopOpen(panel === "shop" ? !isShopOpen : false);
    setIsCartOpen(panel === "cart" ? !isCartOpen : false);
    setIsAuthOpen(panel === "auth" ? (isAuthOpen ? null : "login") : null);
  };

  return (
    <header className="w-full relative z-50">
      {/* Top Header */}
      <div className="bg-teal-700 text-white text-center text-sm h-20 overflow-hidden relative">
        <div key={index} className="animate-flip absolute w-full top-3 left-0">
          {messages[index]}
        </div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-10 left-0 right-0 z-50 bg-teal-100 text-black px-6 py-3 flex items-center justify-between rounded-t-4xl">
        <Image src="/images/logo2.png" alt="Papanketik Logo" width={100} height={50} />

        <ul className="flex items-center gap-6 font-medium">
          <li>
            <Link href="/" className="relative px-6 py-2 hover:text-white group">
              <span className="absolute inset-0 bg-black rounded-full -z-10 opacity-0 group-hover:opacity-100 transition" />
              Home
            </Link>
          </li>
          <li>
            <button
              onClick={() => closeAllExcept("shop")}
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
          <Search className="cursor-pointer" onClick={() => closeAllExcept("search")} />
          <User className="cursor-pointer" onClick={() => closeAllExcept("auth")} />
          <ShoppingCart className="cursor-pointer" onClick={() => closeAllExcept("cart")} />
        </div>
      </nav>

      <div className="h-16" />

      {/* BLUR OVERLAY */}
      <AnimatePresence>
        {(isSearchOpen || isShopOpen || isCartOpen || isAuthOpen) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsSearchOpen(false);
              setIsShopOpen(false);
              setIsCartOpen(false);
              setIsAuthOpen(null);
            }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Panels */}
      <SearchPanel isOpen={isSearchOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={onSearch} />
      <ShopPanel isOpen={isShopOpen} menus={menus} />
      <CartPanel isOpen={isCartOpen} />
      <AuthPanel isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </header>
  );
}

"use client";
import { useEffect, useState } from "react";
import { ChevronDown, Search, User, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/Client";

import AuthPanel from "./AuthPanel";
import SearchPanel from "./SearchPanel";
import ShopPanel from "./ShopPanel";
import CartPanel from "./CartPanel";

type AuthState = "login" | "signup" | "reset" | null;

export default function Header({
  onSearch,
}: {
  onSearch?: (q: string) => void;
}) {
  const messages = [
    "Welcome to papanketik.",
    "Discover custom keyboards.",
    "Type your style, your way.",
  ];

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const [index, setIndex] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState<AuthState>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const isAnyPanelOpen =
    isSearchOpen || isShopOpen || isCartOpen || isAuthOpen;

  /* ===== MESSAGE ROTATION ===== */
  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % messages.length),
      2000
    );
    return () => clearInterval(interval);
  }, []);

  /* ===== FOLLOW CURSOR ===== */
  useEffect(() => {
    if (!isAnyPanelOpen) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAnyPanelOpen]);

  /* ===== AUTH + PROFILE ===== */
  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .single();

        setProfile(profileData);
      } else {
        setProfile(null);
      }
    };

    loadUser();

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ===== INITIALS ===== */
  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const closeAll = () => {
    setIsSearchOpen(false);
    setIsShopOpen(false);
    setIsCartOpen(false);
    setIsAuthOpen(null);
  };

  const closeAllExcept = (panel: string) => {
    setIsSearchOpen(panel === "search" ? !isSearchOpen : false);
    setIsShopOpen(panel === "shop" ? !isShopOpen : false);
    setIsCartOpen(panel === "cart" ? !isCartOpen : false);
    setIsAuthOpen(panel === "auth" ? (isAuthOpen ? null : "login") : null);
  };

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

  return (
    <header className="w-full relative z-50">
      {/* TOP HEADER */}
      <div className="bg-teal-700 text-white text-center text-sm h-20 overflow-hidden relative">
        <div key={index} className="animate-bounce absolute w-full top-3 left-0">
          {messages[index]}
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="absolute top-10 left-0 right-0 z-50 bg-teal-100 px-6 py-3 flex items-center justify-between rounded-t-4xl">
        <Image src="/images/logo2.png" alt="Logo" width={100} height={50} />

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

        <div className="flex items-center text-black">
          <button onClick={() => closeAllExcept("search")} className="p-3 rounded-full hover:bg-black hover:text-white transition">
            <Search size={20} />
          </button>

          <button onClick={() => closeAllExcept("auth")} className="p-2 rounded-full hover:bg-black hover:text-white transition">
            {profile ? (
              <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                {getInitials(profile.full_name)}
              </div>
            ) : (
              <User size={20} />
            )}
          </button>

          <button onClick={() => closeAllExcept("cart")} className="p-3 rounded-full hover:bg-black hover:text-white transition">
            <ShoppingCart size={20} />
          </button>
        </div>
      </nav>

      <div className="h-16" />

      <AnimatePresence>
        {isAnyPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAll}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ left: mousePos.x - 20, top: mousePos.y - 20 }}
              onClick={closeAll}
              className="fixed z-50 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl"
            >
              <X size={18} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <SearchPanel isOpen={isSearchOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={onSearch} />
      <ShopPanel isOpen={isShopOpen} menus={menus} />
      <CartPanel isOpen={isCartOpen} />
      <AuthPanel isOpen={isAuthOpen} setIsOpen={setIsAuthOpen} />
    </header>
  );
}

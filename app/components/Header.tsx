"use client";
import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [subMenu, setSubMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Semua menu dengan link
  const menus: Record<string, { label: string; href: string }[]> = {
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
      <div
        className="bg-teal-700 text-white text-center py-1 text-sm overflow-hidden relative"
        style={{ height: "60px", zIndex: 2 }}
      >
        <div
          key={index}
          className="animate-flip absolute w-full top-3 left-0 -translate-y-[10%] transition-all duration-700"
        >
          {messages[index]}
        </div>
      </div>

      {/* Navbar */}
      <nav
        className="z-50 bg-teal-100 px-6 py-3 flex items-center justify-between rounded-t-4xl relative"
        style={{
          position: "absolute",
          top: "40px",
          left: 0,
          right: 0,
          width: "100%",
        }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Image
            src="/images/logo2.png"
            alt="Papanketik Logo"
            className="mr-2"
            width={100}
            height={50}
          />
        </div>

        {/* Menu */}
        <ul className="flex items-center gap-6 font-medium">
          <li>
            <a
              href="/"
              className="hover-slide px-6 py-2 text-black hover:text-white transition-colors duration-300"
            >
              Home
            </a>
          </li>

          {/* Shop Menu */}
          <li
            className="relative"
            onMouseEnter={() => setOpenMenu("shop")}
            onMouseLeave={() => {
              setOpenMenu(null);
              setSubMenu(null);
            }}
          >
            <button className="hover-slide flex items-center gap-1 px-6 py-2 text-black hover:text-white transition-colors duration-300">
              <span>Shop</span>
              <ChevronDown size={14} className="inline-block" />
            </button>

            {/* Dropdown utama */}
            <AnimatePresence>
              {openMenu === "shop" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-0 w-56 bg-teal-100 shadow-lg rounded-lg z-50"
                >
                  <ul className="flex flex-col py-2 px-4">
                    {Object.keys(menus).map((menuKey) => (
                      <li
                        key={menuKey}
                        className="relative"
                        onMouseEnter={() => setSubMenu(menuKey)}
                        onMouseLeave={() => setSubMenu(null)}
                      >
                        <a
                          href="#"
                          className="px-3 py-2 flex justify-between items-center hover:bg-teal-700 hover:text-white rounded-full transition-colors duration-300"
                        >
                          Shop by{" "}
                          {menuKey.charAt(0).toUpperCase() + menuKey.slice(1)}
                          <ChevronRight size={14} />
                        </a>

                        {/* Submenu */}
                        <AnimatePresence>
                          {subMenu === menuKey && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-0 left-full ml-1 w-56 bg-teal-50 shadow-lg rounded-lg z-50"
                            >
                              <ul className="flex flex-col py-2 bg-teal-100 rounded-md px-4">
                                {menus[menuKey].map((item) => (
                                  <li key={item.label}>
                                    <a
                                      href={item.href}
                                      className="px-3 py-2 block hover:bg-teal-700 hover:text-white rounded-full transition-colors duration-300"
                                    >
                                      {item.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          <li>
            <a
              href="/support"
              className="hover-slide px-6 py-2 text-black hover:text-white transition-colors duration-300"
            >
              Support
            </a>
          </li>
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-4 relative z-10">
          <Search
            color="black"
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
            onClick={() => setIsSearchOpen((prev) => !prev)}
          />
          <Link href="/Authentication/Login/">
            <User
              color="black"
              className="cursor-pointer hover:scale-110 transition-transform duration-300"
            />
          </Link>

          <ShoppingCart
            color="black"
            className="cursor-pointer hover:scale-110 transition-transform duration-300"
          />
        </div>
      </nav>

      {/* Overlay Blur */}
      <AnimatePresence>
        {openMenu === "shop" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: "70px" }} />

      {/* Search Inline */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full bg-teal-100 z-30 relative"
          >
            <div className="px-6 py-4 max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search for keyboards, accessories..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  onSearch?.(e.target.value); // kirim ke parent
                }}
                className="w-full p-2 text-lg rounded-2xl outline-none"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

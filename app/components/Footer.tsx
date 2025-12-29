"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="sticky bottom-0 w-full h-80 bg-black text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col items-center gap-4">
        <Image
          src="/images/logo.png"
          alt="Papanketik Logo"
          width={180}
          height={60}
          priority
        />

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>

        <p className="text-xs text-gray-300 text-center">
          © 2025 Papanketik. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

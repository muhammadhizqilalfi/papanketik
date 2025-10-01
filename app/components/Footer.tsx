"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  const { scrollYProgress } = useScroll();

  // Gerakkan footer dari bawah ke atas seperti lembaran
  const rawY = useTransform(scrollYProgress, [0.9, 1], ["100%", "0%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 20 });

  return (
    <div className="relative">
      {/* Spacer biar ada area untuk reveal */}
      <div className="h-[50vh]" />

      {/* Footer yang akan slide masuk */}
      <motion.footer
        style={{ y }}
        className="absolute bottom-0 left-0 w-full bg-black text-white flex flex-col items-center justify-center py-20 shadow-2xl"
      >
        {/* Logo */}
        <div className="mb-6">
          <Image
            src="/images/logo.png"
            alt="Papanketik Logo"
            width={200}
            height={70}
            priority
          />
        </div>

        {/* Copyright */}
        <p className="text-sm tracking-wide">2025 © papanketik.</p>
      </motion.footer>
    </div>
  );
}

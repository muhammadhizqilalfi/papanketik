"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);

  // Scroll progress KHUSUS footer
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  // Dari bawah → posisi normal
  const yRaw = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 20 });

  return (
    <footer ref={footerRef} className="relative">
      <motion.div
        style={{ y }}
        className="bg-black text-white flex flex-col items-center justify-center py-24 shadow-2xl"
      >
        <div className="mb-6">
          <Image
            src="/images/logo.png"
            alt="Papanketik Logo"
            width={200}
            height={70}
            priority
          />
        </div>

        <p className="text-sm tracking-wide">2025 © papanketik.</p>
      </motion.div>
    </footer>
  );
}

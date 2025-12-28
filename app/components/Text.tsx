"use client";

import { motion } from "framer-motion";

export default function ParallaxText() {
  const text = "- BUILD YOUR OWN KEYBOARD - ";

  return (
    <section className="relative overflow-hidden bg-transparent py-10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {Array(6)
          .fill(text)
          .map((word, i) => (
            <span
              key={i}
              style={{
                fontSize: "20vw",
                WebkitTextStroke: "2px black",
              }}
              className="text-transparent font-extrabold uppercase leading-none"
            >
              {word.split("").map((char: string, idx: number) => (
                <span
                  key={idx}
                  className="hover:text-black transition-colors duration-300"
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
      </motion.div>
    </section>
  );
}

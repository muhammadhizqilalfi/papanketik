"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useRef } from "react";

export default function ParallaxText() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    const text = "- BUILD YOUR OWN KEYBOARD - ";

    return (
        <section
            ref={ref}
            className="relative flex items-center justify-center bg-transparent overflow-hidden h-auto py-0"
        >
            <motion.div
                style={{ x }}
                className="flex gap-0 whitespace-nowrap leading-none"
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
                            className="text-transparent font-extrabold uppercase transition-colors duration-3000"
                        >
                            {word.split("").map((char: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
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

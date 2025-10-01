"use client";

import Image from "next/image";
import Link from "next/link"; // import Link dari next
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // import framer-motion

const productImages = [
  { src: "/images/product1.webp", name: "KBDFans Tofu 60v2.0" },
  { src: "/images/product2.webp", name: "QK60 MKII" },
  { src: "/images/product3.jpg", name: "WS Studio Freya" },
  { src: "/images/product4.webp", name: "Epomaker RT100" },
];

export default function ProductShowcase() {
  const [current, setCurrent] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % productImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Bottom cards hover state
  const [hoverXY, setHoverXY] = useState<{ x: number; y: number }[]>([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [isHover, setIsHover] = useState<boolean[]>([false, false]);

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const offsetX = ((e.clientX - left) / width - 0.5) * 20;
    const offsetY = ((e.clientY - top) / height - 0.5) * 20;
    setHoverXY((prev) => prev.map((v, i) => (i === index ? { x: offsetX, y: offsetY } : v)));
  };

  const handleMouseEnter = (index: number) => {
    setIsHover((prev) => prev.map((v, i) => (i === index ? true : v)));
  };

  const handleMouseLeave = (index: number) => {
    setIsHover((prev) => prev.map((v, i) => (i === index ? false : v)));
    setHoverXY((prev) => prev.map((v, i) => (i === index ? { x: 0, y: 0 } : v)));
  };

  // tambahkan link untuk tiap card
  const bottomCards = [
    { title: "Shop Keyboards", image: "/images/key.webp", link: "/cataloguekey/" },
    { title: "Shop Accessories", image: "/images/acc.webp", link: "/catalogueacc/" },
  ];

  // Variants framer-motion untuk scroll reveal
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.3, duration: 0.6 },
    }),
  };

  return (
    <div className="bg-teal-100 flex flex-col items-center gap-6 p-6 mx-auto justify-center">
      {/* Top Product Showcase */}
      <div className="relative w-full h-180 rounded-xl overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {productImages.map((product) => (
            <div key={product.src} className="flex-shrink-0 w-full relative group">
              <Image
                src={product.src}
                alt={product.name}
                fill
                priority
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>
          ))}
        </div>

        {/* Kontainer teks */}
        <div className="absolute bottom-30 left-6 text-white pointer-events-none">
          <h2 className="text-7xl font-bold">{productImages[current].name}</h2>
          <hr className="border-white w-1/2 mt-1" />
        </div>

        {/* Pagination + Arrows */}
        <div className="absolute inset-x-0 bottom-15 flex items-center justify-center gap-4 pointer-events-none">
          <button
            onClick={() =>
              setCurrent((prev) =>
                prev === 0 ? productImages.length - 1 : prev - 1
              )
            }
            className="pointer-events-auto absolute left-20 top-1/2 transform -translate-y-1/2 text-white transition text-5xl"
          >
            &#8592;
          </button>

          <div className="flex space-x-2 pointer-events-auto z-10">
            {productImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-3 h-3 rounded-full transition ${
                  i === current ? "bg-teal-100" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setCurrent((prev) => (prev + 1) % productImages.length)
            }
            className="pointer-events-auto absolute right-20 top-1/2 transform -translate-y-1/2 text-white transition text-5xl"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full h-80 max-w-9xl">
        {bottomCards.map((card, index) => (
          <motion.div
            key={card.title}
            className="rounded-xl flex flex-col items-center justify-center p-8 relative overflow-hidden cursor-pointer"
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={index}
            variants={cardVariants}
          >
            {/* Background image dengan hover parallax */}
            <div
              className="absolute inset-0 rounded-xl transition-transform duration-300"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: `scale(${isHover[index] ? 1.25 : 1}) translate(${hoverXY[index].x}px, ${hoverXY[index].y}px)`,
              }}
            />

            <div className="absolute inset-0 bg-black/50 rounded-xl" />

            <div className="relative z-10 flex flex-col items-center">
              <p className="text-white mb-4 font-bold text-3xl">{card.title}</p>
              <Link href={card.link}>
                <button className="flex items-center justify-center border border-white text-white rounded-full px-10 py-3 hover:bg-white hover:text-gray-800 transition">
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

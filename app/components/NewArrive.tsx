"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  subtitle: string;
  image: string;
}

const products: Product[] = [
  { id: 0, title: "Shop All Keyboards", subtitle: "Check out all our products", image: "/images/p1.jpg" },
  { id: 1, title: "Neo Series", subtitle: "Elegant, Timeless Design", image: "/images/p2.jpg" },
  { id: 2, title: "QK Series", subtitle: "Innovative & Creative", image: "/images/p3.jpg" },
  { id: 3, title: "OwLab & Percent Studio", subtitle: "Limited & Exclusive", image: "/images/p4.jpg" },
  { id: 4, title: "More Series", subtitle: "Explore More Designs", image: "/images/p5.jpg" },
];

export default function Carousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -432 : 432,
      behavior: "smooth",
    });
  };

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-teal-100 py-16">
      {/* HEADER */}
      <div className="px-8 mb-8">
        <h2 className="text-5xl font-semibold mb-4">New Arrival</h2>
        <p className="text-xl text-gray-600">Fresh Design, Just Dropped</p>
      </div>

      {/* CAROUSEL */}
      <div className="relative group">
        {/* ARROWS */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 bg-black text-white rounded-full shadow
          opacity-0 group-hover:opacity-100 transition
          pointer-events-none group-hover:pointer-events-auto"
        >
          <ChevronLeft className="mx-auto" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10
          w-12 h-12 bg-black text-white rounded-full shadow
          opacity-0 group-hover:opacity-100 transition
          pointer-events-none group-hover:pointer-events-auto"
        >
          <ChevronRight className="mx-auto" />
        </button>

        {/* SCROLL AREA */}
        <div
          ref={scrollRef}
          className="
            flex gap-8 px-8 pb-6
            overflow-x-auto scroll-smooth
            [scrollbar-width:none] [-ms-overflow-style:none]
          "
          style={{ scrollbarWidth: "none" }}
        >
          {products.map((item, i) => (
            <div
              key={item.id}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`
                w-112.5 h-112.5 shrink-0
                bg-white rounded-3xl overflow-hidden
                shadow-sm hover:shadow-md transition-all duration-700
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
            >
              <div className="relative h-85">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

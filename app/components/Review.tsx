"use client";
import { useEffect, useRef, useState } from "react";

interface Review {
  id: number;
  name: string;
  role: string;
  comment: string;
  size: "small" | "large";
  offset: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Alex Morgan",
    role: "Designer",
    comment: "Build quality is insane. Every detail feels premium.",
    size: "large",
    offset: -12,
  },
  {
    id: 2,
    name: "Kevin Lim",
    role: "Developer",
    comment: "Typing experience is buttery smooth. Worth every cent.",
    size: "small",
    offset: 20,
  },
  {
    id: 3,
    name: "Rina Sato",
    role: "Content Creator",
    comment: "Minimal, expressive, and thoughtfully designed.",
    size: "large",
    offset: 10,
  },
  {
    id: 4,
    name: "Daniel Cruz",
    role: "Product Manager",
    comment: "Feels more like an art piece than a keyboard.",
    size: "small",
    offset: -16,
  },
  {
    id: 5,
    name: "Maya Chen",
    role: "Illustrator",
    comment: "Sound profile is clean and incredibly satisfying.",
    size: "large",
    offset: 24,
  },
  {
    id: 6,
    name: "Ivan Petrov",
    role: "Engineer",
    comment: "Solid, refined, and built with intention.",
    size: "small",
    offset: -8,
  },
];

export default function Review() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section
      ref={sectionRef}
      className="bg-teal-100 text-white py-14 rounded-b-4xl"
    >
      {/* HEADER */}
      <div className="px-8 mb-16 max-w-4xl mx-auto text-center">
        <h2 className="text-5xl font-semibold mb-4 text-black">
          What People Say
        </h2>
        <p className="text-gray-600 text-xl">
          Thoughts from creators, builders, and enthusiasts
        </p>
      </div>

      {/* RANDOM GRID */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-6
          gap-8 px-8
          auto-rows-[180px]
          grid-flow-dense
        "
      >
        {reviews.map((review, i) => {
          const isLarge = review.size === "large";

          return (
            <div
              key={review.id}
              style={{
                transform: visible
                  ? `translateY(${review.offset}px)`
                  : "translateY(40px)",
                transitionDelay: `${i * 100}ms`,
              }}
              className={`
                rounded-3xl bg-white border border-white/10
                p-6 flex flex-col justify-between
                transition-all duration-700 ease-out
                ${visible ? "opacity-100" : "opacity-0"}
                ${isLarge ? "col-span-3 row-span-2" : "col-span-2 row-span-1"}
              `}
            >
              <p className="text-sm leading-relaxed text-black">
                “{review.comment}”
              </p>

              <div className="mt-6">
                <p className="font-medium text-black">{review.name}</p>
                <p className="text-xs text-gray-500">
                  {review.role}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-30"/>
    </section>
  );
}

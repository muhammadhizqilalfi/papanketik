"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
    thumbnails?: string[]; // 4 thumbnails
    description?: string;
  } | null;
}

export default function ProductDetail({
  isOpen,
  onClose,
  product,
}: ProductDetailProps) {
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (isOpen && product) {
      setActiveImage(product.image);
      const stored = localStorage.getItem("recentlyViewed");
      const recent = stored ? JSON.parse(stored) : [];

      const exists = recent.find((p: any) => p.id === product.id);
      if (!exists) {
        const updated = [product, ...recent].slice(0, 6);
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      }
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const thumbnails = product.thumbnails || [];

  const handlePrev = () => {
    const currentIndex = thumbnails.indexOf(activeImage);
    if (currentIndex > 0) setActiveImage(thumbnails[currentIndex - 1]);
  };

  const handleNext = () => {
    const currentIndex = thumbnails.indexOf(activeImage);
    if (currentIndex < thumbnails.length - 1) setActiveImage(thumbnails[currentIndex + 1]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-teal-50 rounded-2xl shadow-2xl w-[90%] max-w-4xl relative overflow-hidden p-6 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition"
        >
          <X size={18} className="text-white" />
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column: Main Image + Thumbnails */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow">
              <Image src={activeImage} alt={product.name} fill className="object-cover" />
              {/* Navigation Buttons */}
              {thumbnails.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {thumbnails.map((thumb, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveImage(thumb)}
                  className={`w-full h-16 rounded-lg overflow-hidden shadow cursor-pointer border-2 ${
                    activeImage === thumb ? "border-teal-600" : "border-transparent"
                  }`}
                >
                  <Image src={thumb} alt={`thumb-${idx}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h2 className="font-bold text-xl md:text-2xl mb-2">{product.name}</h2>
              <p className="text-lg md:text-xl font-semibold text-teal-700 mb-4">{product.price}</p>
              <p className="text-gray-600 text-sm md:text-base">
                {product.description || "Detail Product"}
              </p>
            </div>

            <button className="mt-6 w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

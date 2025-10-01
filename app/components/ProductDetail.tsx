"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ProductDetailProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: string;
    image: string;
  } | null;
}

export default function ProductDetail({
  isOpen,
  onClose,
  product,
}: ProductDetailProps) {
  if (!isOpen || !product) return null;

  // Simpan ke localStorage saat modal terbuka
  useEffect(() => {
    if (product) {
      const stored = localStorage.getItem("recentlyViewed");
      const recent = stored ? JSON.parse(stored) : [];

      // Cek duplikat
      const exists = recent.find((p: any) => p.id === product.id);
      if (!exists) {
        const updated = [product, ...recent].slice(0, 6); // max 6
        localStorage.setItem("recentlyViewed", JSON.stringify(updated));
      }
    }
  }, [product]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-3xl relative overflow-hidden animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center bg-red-500 rounded-full hover:bg-red-600 transition"
        >
          <X size={14} className="text-black" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          {/* Gambar Produk */}
          <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Detail Produk */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-2xl text-teal-700 font-semibold mb-6">
                {product.price}
              </p>
              <p className="text-gray-600 mb-6">
                Keyboard custom dengan layout 60% yang ringkas dan portabel,
                cocok untuk pengguna yang menginginkan efisiensi ruang tanpa
                mengorbankan fungsionalitas.
              </p>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="flex-1 px-5 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition">
                Add to Cart
              </button>
              <button className="flex-1 px-5 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Product {
  _id?: string;
  name: string;
  price: number;
  image: string;
}

interface SearchPanelProps {
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearch?: (q: string) => void;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const word = {
  hidden: { opacity: 0, y: 5, x: 20 },
  visible: { opacity: 1, y: 0, x: 22 },
};

export default function SearchPanel({
  isOpen,
  searchQuery,
  setSearchQuery,
  onSearch,
}: SearchPanelProps) {
  const router = useRouter(); // ✅ tambahkan router
  const placeholderText = "Search for keyboards, accessories...".split(" ");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.products || [])
          .filter((p: Product) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3);
        setResults(filtered);
      })
      .catch(console.error);
  }, [searchQuery]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-full left-0 w-full bg-teal-100 shadow-xl z-50 rounded-b-4xl"
        >
          <div className="max-w-3xl mx-auto px-6 py-6 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="w-full px-5 py-3 text-lg rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-black relative z-20"
            />

            {/* Placeholder animasi hanya ketika input kosong */}
            {searchQuery === "" && (
              <motion.div
                className="absolute left-5 top-1/2 transform -translate-y-1/2 text-lg text-gray-400 flex flex-wrap gap-1 pointer-events-none z-30"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {placeholderText.map((wordText, i) => (
                  <motion.span key={i} variants={word} className="inline-block">
                    {wordText}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {/* Search Results */}
            {searchQuery !== "" && results.length > 0 && (
              <div className="mt-4 bg-white rounded-xl shadow divide-y divide-gray-200">
                {results.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition"
                    onClick={() => router.push(`/shop/${product._id}`)}
                  >
                    <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-teal-700 font-bold">${product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {searchQuery !== "" && results.length === 0 && (
              <div className="mt-4 p-3 text-gray-500 text-center">
                No products found.
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

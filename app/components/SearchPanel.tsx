"use client";
import { motion, AnimatePresence } from "framer-motion";

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
  visible: { opacity: 1, y: 0, x: 22},
};

export default function SearchPanel({ isOpen, searchQuery, setSearchQuery, onSearch }: SearchPanelProps) {
  const placeholderText = "Search for keyboards, accessories...".split(" ");

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
          <div className="max-w-3xl mx-auto px-6 py-8 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="w-full px-5 py-3 text-lg rounded-full bg-white text-black outline-none focus:ring-2 focus:ring-black relative z-20"
            />

            {/* Placeholder animasi di atas input */}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

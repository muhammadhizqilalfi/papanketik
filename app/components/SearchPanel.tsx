"use client";
import { motion, AnimatePresence } from "framer-motion";

interface SearchPanelProps {
  isOpen: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSearch?: (q: string) => void;
}

export default function SearchPanel({ isOpen, searchQuery, setSearchQuery, onSearch }: SearchPanelProps) {
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
          <div className="max-w-3xl mx-auto px-6 py-8">
            <input
              type="text"
              placeholder="Search for keyboards, accessories..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              className="w-full px-5 py-3 text-lg rounded-full bg-gray-200 text-black outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { Home } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // data produk dengan image + harga
  const products = [
    { id: 1, name: "KBDFans Tofu60 Rev2.0", price: "Rp 350.000", image: "/images/product1.webp" },
    { id: 2, name: "QK MKII", price: "Rp 420.000", image: "/images/product2.webp" },
    { id: 3, name: "Wuque Studio Freya", price: "Rp 250.000", image: "/images/product3.jpg" },
    { id: 4, name: "Epomaker RT100", price: "Rp 599.000", image: "/images/product4.webp" },
    { id: 5, name: "Tiger Lite Gaming", price: "Rp 150.000", image: "/images/product5.jpg" },
    { id: 6, name: "Corgi Fairlady Alice", price: "Rp 720.000", image: "/images/product6.jpg" },
    { id: 7, name: "Agar mini", price: "Rp 310.000", image: "/images/product7.jpg" },
    { id: 8, name: "Agar Standart", price: "Rp 280.000", image: "/images/product8.jpg" },
    { id: 9, name: "Onibi", price: "Rp 280.000", image: "/images/product9.jpg" },
  ];

  // fungsi parsing harga
  const parsePrice = (price: string) => parseInt(price.replace(/[^\d]/g, ""), 10);

  // filter produk berdasarkan search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // sorting produk
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
    if (sortOption === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  // pagination
  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Pass setSearchQuery ke Header */}
      <Header onSearch={setSearchQuery} />

      <div className="min-h-screen bg-teal-100 p-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-2xl mb-7 mt-20">
          <Home size={20} />
          <span>Collections</span>
        </div>

        {/* Title + Sorting */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Catalogue</h1>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-lg outline-none border-none bg-teal-50"
          >
            <option value="default">Default</option>
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Cheapest)</option>
            <option value="price-desc">Price (Expensive)</option>
          </select>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
          {paginatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition"
            >
              <div className="relative w-full h-80">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 border-t bg-white flex justify-between items-center">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-teal-700 font-bold">{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-3">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border 
                ${
                  currentPage === i + 1
                    ? "bg-black text-white border-black"
                    : "border-teal-500 text-teal-600 hover:bg-teal-50"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

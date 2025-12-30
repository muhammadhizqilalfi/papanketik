"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Definisikan tipe untuk produk
interface Product {
  _id: string;
  id?: string;
  name: string;
  price: number;
  image: string | string[];
}

export default function Page() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Fetch produk dari database
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch(console.error);
  }, []);

  // Ambil Recently Viewed dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) setRecentlyViewed(JSON.parse(stored));
  }, []);

  const clearRecentlyViewed = () => {
    localStorage.removeItem("recentlyViewed");
    setRecentlyViewed([]);
  };

  const parsePrice = (price: number) => price;

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name-asc") return a.name.localeCompare(b.name);
    if (sortOption === "name-desc") return b.name.localeCompare(a.name);
    if (sortOption === "price-asc") return parsePrice(a.price) - parsePrice(b.price);
    if (sortOption === "price-desc") return parsePrice(b.price) - parsePrice(a.price);
    return 0;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  const getMainImage = (product: Product) => {
    if (!product) return "/placeholder.png";
    if (Array.isArray(product.image)) return product.image[0] || "/placeholder.png";
    try {
      const parsed = JSON.parse(product.image);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
    } catch (err) {
      console.error("Failed to parse product image:", err);
    }
    return typeof product.image === "string" ? product.image : "/placeholder.png";
  };

  const handleClickProduct = (product: Product) => {
    // Tambahkan ke recently viewed
    const updated = [product, ...recentlyViewed.filter((p) => p._id !== product._id)];
    setRecentlyViewed(updated.slice(0, 10));
    localStorage.setItem("recentlyViewed", JSON.stringify(updated.slice(0, 10)));

    // Navigate ke halaman produk full-page
    router.push(`/shop/${product._id}`);
  };

  return (
    <div>
      <Header onSearch={setSearchQuery} />

      <div className="min-h-screen bg-teal-100 p-6 z-10 relative rounded-b-4xl">
        <div className="flex items-center gap-2 text-2xl mb-7 mt-20">
          <Home size={20} />
          <span>Collections</span>
        </div>

        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold">Catalogue</h1>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-full outline-none border-none bg-teal-50"
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
              key={product._id}
              className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden transition cursor-pointer"
              onClick={() => handleClickProduct(product)}
            >
              <div className="relative w-full h-80">
                <Image
                  src={getMainImage(product)}
                  alt={product.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="p-6 border-t bg-white flex justify-between items-center">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="text-teal-700 font-medium text-xl">Rp {product.price}</p>
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

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-4xl font-bold">Recently Viewed</h2>
              <button
                onClick={clearRecentlyViewed}
                className="text-sm text-white px-4 py-2 bg-red-400 rounded-full hover:bg-red-500 transition"
              >
                Clear
              </button>
            </div>
            <div className="mb-8" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {recentlyViewed.map((product) => (
                <div
                  key={product._id || product.id}
                  className="bg-white rounded-xl shadow overflow-hidden cursor-pointer hover:shadow"
                  onClick={() => handleClickProduct(product)}
                >
                  <div className="relative w-full h-80">
                    <Image
                      src={getMainImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">{product.name}</h3>
                    <p className="text-teal-600 font-medium text-xl">
                      Rp {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

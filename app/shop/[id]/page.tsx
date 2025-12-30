"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface Product {
  _id?: string;
  name: string;
  price: number | string;
  stock: number;
  image: string | string[];
  description?: string;
  brand?: string;
  category?: string;
}

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const activeThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!productId) return;

    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const prod = data.products.find((p: any) => p._id === productId);
        if (prod) setProduct(prod);
      })
      .catch(console.error);
  }, [productId]);

  const images: string[] = product
    ? Array.isArray(product.image)
      ? product.image
      : [product.image]
    : [];

  useEffect(() => {
    if (product) {
      setActiveImage(images[0] || "/placeholder.png");
      setQuantity(1);
    }
  }, [product, images]);

  useEffect(() => {
    if (activeThumbRef.current) {
      activeThumbRef.current.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  }, [activeImage]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  const handlePrev = () => {
    const idx = images.indexOf(activeImage);
    if (idx > 0) setActiveImage(images[idx - 1]);
  };

  const handleNext = () => {
    const idx = images.indexOf(activeImage);
    if (idx < images.length - 1) setActiveImage(images[idx + 1]);
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} x ${product.name} to cart`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="bg-teal-100 relative rounded-b-4xl z-10 py-15">
        <main className="flex-1 px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white max-w-6xl items-center mx-auto rounded-4xl">
        {/* Left: Image Gallery */}
        <div className="flex flex-col gap-4 items-center">
          {/* Main Image */}
          <div className="relative max-w-md md:max-w-full h-96 md:h-112 rounded-2xl overflow-hidden flex items-center justify-center">
            {activeImage && (
              <Image
                src={activeImage}
                alt={product.name}
                width={600}
                height={600}
                className="object-contain"
                unoptimized
              />
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition z-20"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/70 transition z-20"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          <div
            className="flex gap-2 mt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 justify-start max-w-md md:max-w-full"
            ref={thumbnailsRef}
          >
            {images.map((img, idx) => (
              <div
                key={idx}
                ref={activeImage === img ? activeThumbRef : null}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer shrink-0 border-2 transition ${
                  activeImage === img ? "border-teal-600" : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`thumb-${idx}`}
                  width={80}
                  height={80}
                  className="object-cover"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex flex-col justify-between gap-4 p-6">
          <div className="flex flex-col gap-2">
            {product.brand && <p className="text-sm text-gray-500">{product.brand}</p>}
            <h1 className="font-bold text-3xl md:text-4xl">{product.name}</h1>
            {product.category && <p className="text-gray-600 text-sm">{product.category}</p>}

            <p className="text-gray-700 mt-4">{product.description || "No description available."}</p>

            <p className="text-3xl font-bold text-teal-700 mt-4">${product.price}</p>
            <p className="text-gray-800 font-medium mt-2">Stock: {product.stock}</p>

            {/* Quantity */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.stock}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val))
                    setQuantity(Math.min(Math.max(1, val), product.stock));
                }}
                className="w-16 text-center border rounded-md py-1"
              />
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 bg-black text-white font-medium rounded-full hover:bg-teal-700 transition"
            >
              Add to Cart
            </button>
            <button className="w-12 h-12 flex items-center justify-center border rounded-full hover:bg-red-100 transition">
              <Heart size={20} className="text-red-500" />
            </button>
          </div>
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
}

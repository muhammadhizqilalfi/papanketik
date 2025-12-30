// ====================== AdminDashboard.tsx ======================
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface Product {
  _id?: string;
  name: string;
  description: string;
  image: string | string[]; // bisa string atau array
  stock: number;
  price: number;
  type: "keyboard" | "accessory";
}

export default function AdminDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [activePanel, setActivePanel] = useState<"users" | "products" | "stats">("users");

  // CRUD Produk state
  const [form, setForm] = useState<Product>({
    name: "",
    description: "",
    image: "",
    stock: 0,
    price: 0,
    type: "keyboard",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // ====================== AUTH & REDIRECT ======================
  useEffect(() => {
    if (status === "unauthenticated") router.replace("/");
    if (status === "authenticated" && session?.user?.role !== "admin") router.replace("/dashboard");
    if (status === "authenticated" && session?.user?.role === "admin") {
      fetchUsers();
      fetchProducts();
    }
  }, [status, session, router]);

  // ====================== FETCH USERS ======================
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ====================== FETCH PRODUCTS ======================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ====================== CRUD PRODUCTS ======================
  const handleSubmitProduct = async () => {
    try {
      // convert string image menjadi array jika dipisah koma
      const submitData = {
        ...form,
        image: typeof form.image === "string"
          ? form.image.split(",").map((url) => url.trim())
          : form.image,
      };

      if (editingId) {
        await fetch("/api/admin/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...submitData, id: editingId }),
        });
      } else {
        await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(submitData),
        });
      }

      setForm({ name: "", description: "", image: "", stock: 0, price: 0, type: "keyboard" });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProduct = (product: Product) => {
    setForm(product);
    setEditingId(product._id || null);
    setActivePanel("products");
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure to delete this product?")) return;
    await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  if (status === "loading" || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />

      <main className="mt-20 px-6 py-12 flex gap-8 bg-teal-100 relative rounded-b-4xl items-start z-10">
        {/* ====================== CONTENT UTAMA ====================== */}
        <div className="flex-1 bg-teal-100 rounded-b-4xl p-8">
          {activePanel === "users" && (
            <>
              <h1 className="text-5xl font-bold mb-6">Users List</h1>
              {users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
              ) : (
                <div className="space-y-4">
                  {users.map((user) => (
                    <div
                      key={user._id}
                      className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
                    >
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">Role: {user.role}</p>
                      </div>
                      <button className="px-3 py-1 bg-red-400 rounded-full hover:bg-red-500 transition">
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activePanel === "products" && (
            <>
              <h1 className="text-5xl font-bold mb-6">Products</h1>

              {/* FORM */}
              <div className="bg-white p-6 rounded-xl shadow mb-6">
                <h2 className="text-2xl font-semibold mb-4">{editingId ? "Edit Product" : "Add Product"}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="p-2 border rounded-xl"
                  />
                  <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="p-2 border rounded-xl"
                  />
                  <input
                    placeholder="Image URLs (comma separated)"
                    value={Array.isArray(form.image) ? form.image.join(",") : form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="p-2 border rounded-xl"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="p-2 border rounded-xl"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="p-2 border rounded-xl"
                  />
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value as "keyboard" | "accessory" })}
                    className="p-2 border rounded-xl"
                  >
                    <option value="keyboard">Keyboard</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
                <button
                  onClick={handleSubmitProduct}
                  className="mt-4 px-4 py-2 bg-teal-400 text-black rounded-xl hover:bg-teal-600 transition"
                >
                  {editingId ? "Update" : "Add"}
                </button>
              </div>

              {/* LIST */}
              <div className="space-y-4">
                {products.map((p) => (
                  <div key={p._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-gray-500">{p.description}</p>
                      <p className="text-xs text-gray-400">
                        Type: {p.type} | Stock: {p.stock} | Price: ${p.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditProduct(p)}
                        className="px-3 py-1 bg-yellow-400 rounded-full hover:bg-yellow-400 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(p._id!)}
                        className="px-3 py-1 bg-red-400 rounded-full hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activePanel === "stats" && (
            <div>
              <h1 className="text-5xl font-bold mb-6">Stats / Reports</h1>
              <p>Coming soon...</p>
            </div>
          )}
        </div>

        {/* ====================== SIDEBAR ====================== */}
        <aside className="w-80 bg-white p-6 rounded-4xl shadow-md shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Admin Panel</h2>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3 py-1 bg-red-400 rounded-full hover:bg-red-500 transition"
            >
              Logout
            </button>
          </div>

          <nav className="space-y-4 mt-8">
            <button
              className={`w-full text-left px-4 py-2 rounded-full transition ${
                activePanel === "users" ? "bg-teal-400" : "bg-teal-200 hover:bg-teal-400"
              }`}
              onClick={() => setActivePanel("users")}
            >
              Users List
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-full transition ${
                activePanel === "products" ? "bg-teal-400" : "bg-teal-200 hover:bg-teal-400"
              }`}
              onClick={() => setActivePanel("products")}
            >
              Products
            </button>
            <button
              className={`w-full text-left px-4 py-2 rounded-full transition ${
                activePanel === "stats" ? "bg-teal-400" : "bg-teal-200 hover:bg-teal-400"
              }`}
              onClick={() => setActivePanel("stats")}
            >
              Stats / Reports
            </button>
          </nav>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

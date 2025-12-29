"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface Order {
  id: string;
  date: string;
  total: number;
}

export default function AccountDashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [orders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingCountry, setEditingCountry] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const COUNTRIES = [
  "Indonesia",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Japan",
  "China",
  "Australia",
];


  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
      return;
    }

    if (status === "authenticated") {
      setFullName(session.user?.name || "");
      setEmail(session.user?.email || "");
      setCountry("Indonesia");
      setLoading(false);
    }
  }, [status, session, router]);

  if (status === "loading" || loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading account...</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Header />

      <main className="min-h-125 relative z-10 bg-teal-100 rounded-b-4xl px-6 py-12 flex flex-col md:flex-row gap-8 mt-20">
        {/* MAIN */}
        <div className="flex-1 ml-25">
          <h1 className="text-7xl font-bold mb-6">My account</h1>

          <section>
            <h2 className="text-3xl font-semibold mb-2">Order history</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500">
                You haven't placed any orders yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order) => (
                  <li key={order.id} className="bg-white p-4 rounded shadow">
                    Order #{order.id}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="w-full md:w-96 bg-[#fffffffb] p-6 rounded-4xl mr-25">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl">Account details</h2>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-lg font-semibold bg-red-300 px-3 py-1 rounded-full hover:bg-red-500 transition"
            >
              Log out
            </button>
          </div>

          <div className="space-y-6 mt-18">
            {/* NAME */}
            <div>
              <p className="text-black text-sm font-light">Name</p>
              {editingName ? (
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  autoFocus
                  className="w-full px-3 py-2 rounded-full bg-white outline-none"
                />
              ) : (
                <p
                  onClick={() => setEditingName(true)}
                  className="font-medium text-lg cursor-pointer"
                >
                  {fullName || "Click to set name"}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <p className="text-black text-sm font-light">Email</p>
              {editingEmail ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setEditingEmail(false)}
                  autoFocus
                  className="w-full px-3 py-2 rounded-full bg-white outline-none"
                />
              ) : (
                <p
                  onClick={() => setEditingEmail(true)}
                  className="font-medium text-lg cursor-pointer"
                >
                  {email}
                </p>
              )}
            </div>

            {/* COUNTRY */}
            <div>
              <p className="text-sm">Country</p>
              {editingCountry ? (
                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setEditingCountry(false);
                  }}
                  autoFocus
                  className="w-full px-3 py-2 rounded-full bg-white outline-none cursor-pointer"
                >
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              ) : (
                <p
                  onClick={() => setEditingCountry(true)}
                  className="text-xl cursor-pointer"
                >
                  {country || "Click to set country"}
                </p>
              )}
            </div>
          </div>
        </aside>
      </main>

      <Footer />
    </div>
  );
}

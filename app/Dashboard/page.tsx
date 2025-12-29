"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { supabase } from "@/lib/Client";

interface Order {
  id: string;
  date: string;
  total: number;
}

export default function AccountDashboard() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [editingCountry, setEditingCountry] = useState(false);
  const [country, setCountry] = useState("");

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  // Ambil user + profile
  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        router.push("/");
        return;
      }

      setUser(user);

      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setFullName(profileData?.full_name || "");
      setEmail(user.email || "");
      setProfile(profileData);
      setCountry(profileData?.country || "");
      setLoading(false);
    };

    load();
  }, [router]);

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Simpan country
  const saveCountry = async () => {
    if (!user) return;

    await supabase.from("profiles").update({ country }).eq("id", user.id);

    setProfile((prev: any) => ({ ...prev, country }));
    setEditingCountry(false);
  };

  const saveName = async () => {
    if (!user) return;

    await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);

    setProfile((prev: any) => ({ ...prev, full_name: fullName }));
    setEditingName(false);
  };

  const saveEmail = async () => {
    if (!user) return;

    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Verification email sent to your new email address");
    setEditingEmail(false);
  };

  // Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading account...</p>
      </div>
    );
  }

  // Safety fallback
  if (!user || !profile) {
    return null;
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
              onClick={handleLogout}
              className="text-lg font-semibold bg-red-300 px-3 py-1 rounded-full hover:bg-red-500 transition"
            >
              Log out
            </button>
          </div>

          <div className="space-y-6 mt-18">
            <div>
              <p className="text-black text-sm font-light">Name</p>

              {editingName ? (
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  onBlur={saveName}
                  autoFocus
                  className="w-full px-3 py-2 rounded-full bg-white outline-none"
                />
              ) : (
                <p
                  onClick={() => setEditingName(true)}
                  className="font-medium text-lg cursor-pointer"
                >
                  {profile.full_name || "Click to set name"}
                </p>
              )}
            </div>

            <div>
              <p className="text-black text-sm font-light">Email</p>

              {editingEmail ? (
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={saveEmail}
                  autoFocus
                  className="w-full px-3 py-2 rounded-full bg-white outline-none"
                />
              ) : (
                <p
                  onClick={() => setEditingEmail(true)}
                  className="font-medium text-lg cursor-pointer"
                >
                  {user.email}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm">Country</p>
              {editingCountry ? (
                <input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  onBlur={saveCountry}
                  autoFocus
                  className="w-full px-3 py-2 rounded-full bg-white outline-none"
                />
              ) : (
                <p
                  onClick={() => setEditingCountry(true)}
                  className="text-xl cursor-pointer"
                >
                  {profile.country || "Click to set country"}
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

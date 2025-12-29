"use client";
import Link from "next/link";
import { User, Package, Heart, Settings, Bell } from "lucide-react";

export default function Sidebar() {
  const menu = [
    { label: "Profile", icon: User, href: "/dashboard/profile" },
    { label: "Orders", icon: Package, href: "/dashboard/orders" },
    { label: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
    { label: "Settings", icon: Settings, href: "/dashboard/settings" },
    { label: "Notifications", icon: Bell, href: "/dashboard/notifications" },
  ];

  return (
    <aside className="w-64 bg-teal-100 min-h-screen p-6 flex flex-col gap-6 rounded-tr-3xl shadow-2xl">
      <h1 className="text-2xl font-bold text-black mb-6">Papanketik</h1>
      <nav className="flex flex-col gap-4">
        {menu.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-teal-200 transition font-medium"
          >
            <item.icon size={20} /> {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

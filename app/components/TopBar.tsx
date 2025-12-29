"use client";
import { Bell, User } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex justify-between items-center bg-teal-50 p-4 rounded-3xl shadow-md mb-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>
      <div className="flex items-center gap-4">
        <Bell className="cursor-pointer" />
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 shadow-sm">
          <User />
          <span className="font-medium">John Doe</span>
        </div>
      </div>
    </div>
  );
}

"use client";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardCard from "../components/DashboardCard";
import { Package, Heart, User } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">
        <TopBar />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Orders" value={12} icon={<Package />} bgColor="bg-teal-200" />
          <DashboardCard title="Wishlist" value={5} icon={<Heart />} bgColor="bg-teal-300" />
          <DashboardCard title="Profile Completeness" value="80%" icon={<User />} bgColor="bg-teal-400" />
        </div>

        {/* Main content */}
        <div className="bg-white rounded-3xl shadow-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-300">
                  <th className="py-2 px-4">Order #</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4">#001</td>
                  <td className="py-2 px-4">Custom Keycap Set</td>
                  <td className="py-2 px-4 text-green-600 font-medium">Shipped</td>
                  <td className="py-2 px-4">2025-12-01</td>
                  <td className="py-2 px-4">$45</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4">#002</td>
                  <td className="py-2 px-4">Mechanical Switches</td>
                  <td className="py-2 px-4 text-yellow-600 font-medium">Processing</td>
                  <td className="py-2 px-4">2025-12-10</td>
                  <td className="py-2 px-4">$30</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

"use client";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor?: string;
}

export default function DashboardCard({ title, value, icon, bgColor }: DashboardCardProps) {
  return (
    <div className={`flex items-center gap-4 p-6 rounded-2xl shadow-lg ${bgColor || "bg-white"}`}>
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </div>
  );
}

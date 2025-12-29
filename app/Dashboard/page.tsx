import Header from "../components/Header"; // opsional
import Footer from "../components/Footer"; // opsional

// Dummy data user, nanti bisa diganti dengan props atau API
interface Order {
  id: string;
  date: string;
  total: number;
}

const user = {
  name: "Hizqil Alfi",
  country: "Indonesia",
  orders: [] as Order[],
  addressCount: 1,
};

export default function AccountDashboard() {
  return (
    <div className="relative">
      <Header />

      <main className="min-h-125 relative z-10 bg-teal-100 rounded-b-4xl px-6 py-12 flex flex-col md:flex-row gap-8 mt-20">
        {/* Main content: Order History */}
        <div className="flex-1 ml-25">
          <h1 className="text-7xl font-bold mb-6">My account</h1>

          <section>
            <h2 className="text-3xl font-semibold mb-2">Order history</h2>
            {user.orders.length === 0 ? (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            ) : (
              <ul className="space-y-4">
                {user.orders.map((order) => (
                  <li key={order.id} className="bg-white p-4 rounded shadow">
                    {/* order details */}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Sidebar: Account Details */}
        <aside className="w-full md:w-96 bg-[#fffffffb] p-6 rounded-4xl mr-25">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl">Account details</h2>
            <button className="text-lg font-semibold text-black bg-red-300 px-3 py-1 rounded-full hover:bg-red-400 transition">
              Log out
            </button>
          </div>

          <div className="space-y-6 mt-18">
            <div>
              <p className="text-black text-sm font-light">Name</p>
              <p className="font-medium text-lg">{user.name}</p>
            </div>
            <div>
              <p className="text-black text-sm font-light">Country</p>
              <p className="font-medium text-xl">{user.country}</p>
            </div>
          </div>

          <button className="mt-15 w-full bg-black text-white py-2 px-4 rounded-full hover:bg-gray-800">
            View addresses ({user.addressCount})
          </button>
        </aside>

        {/* Spacer untuk footer reveal */}
        <div className="h-17.5" />
      </main>

      <Footer />
    </div>
  );
}

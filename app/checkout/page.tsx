import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  return (
    <div className="relative">
      <Header />

      <main className="relative z-10 bg-teal-100 rounded-b-4xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT – FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            {/* Contact */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Contact information</h2>
              <input
                type="email"
                placeholder="Email address"
                className="w-full mb-4 px-5 py-3 rounded-full border outline-none focus:ring-2 focus:ring-black"
              />
            </section>

            {/* Shipping */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Shipping address</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="input" placeholder="First name" />
                <input className="input" placeholder="Last name" />
              </div>

              <input className="input mt-4" placeholder="Address" />
              <input className="input mt-4" placeholder="Apartment, suite (optional)" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <input className="input" placeholder="City" />
                <input className="input" placeholder="Province" />
                <input className="input" placeholder="Postal code" />
              </div>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-xl font-semibold mb-4">Payment</h2>

              <div className="p-5 rounded-2xl border bg-gray-50 text-sm text-gray-600">
                Payment gateway integration (Midtrans / Stripe / Xendit)
                <br />
                will be implemented here.
              </div>
            </section>
          </div>

          {/* RIGHT – ORDER SUMMARY */}
          <aside className="bg-white rounded-3xl p-8 shadow h-fit">
            <h2 className="text-xl font-semibold mb-6">Order summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Custom Keyboard</span>
                <span>$320</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Shipping</span>
                <span>$20</span>
              </div>
            </div>

            <div className="border-t pt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>$340</span>
            </div>

            <button className="mt-8 w-full bg-black text-white py-4 rounded-full hover:bg-gray-900 transition">
              Complete order
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure checkout • SSL encrypted
            </p>
          </aside>
        </div>

        {/* Spacer for footer reveal */}
        <div className="h-40" />
      </main>

      <Footer />
    </div>
  );
}

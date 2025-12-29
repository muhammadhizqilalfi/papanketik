import Header from "../components/Header";
import Footer from "../components/Footer";

export default function SupportPage() {
  return (
    <div className="relative">
      <Header />

      <main className="relative z-10 bg-teal-100 rounded-b-4xl">
        <section className="min-h-125 flex px-6">
          <div className="max-w-5xl ml-25">
            <h1 className="text-7xl font-bold mb-10 mt-40">
              Support
            </h1>

            <p className="text-gray-700 text-xl">
              For after-sales support inquiries, please email{" "}
              <a
                href="mailto:support@papanketik.com"
                className="text-teal-600 underline"
              >
                support@papanketik.com
              </a>
            </p>
          </div>
        </section>

        {/* Spacer */}
        <div className="h-17.5" />
      </main>

      <Footer />
    </div>
  );
}

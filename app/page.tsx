import Header from "./components/Header";
import ProductShowcase from "./components/ProductShowcase";
import Footer from "./components/Footer";
import Text from "./components/Text";
import NewArrival from "./components/NewArrive";
import Review from "./components/Review";

export default function Home() {
  return (
    <div className="relative">
      <Header />

      <main className="relative z-10 bg-teal-600 rounded-b-4xl">
        <ProductShowcase />
        <Text />

        <hr className="w-400 mx-auto border mb-20"/>
        <hr className="w-7xl mx-auto border mb-20"/>

        <NewArrival />

        <Review />
      </main>
      
      <Footer />
    </div>
  );
}

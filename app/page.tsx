import Image from "next/image";
import Header from "./components/Header";
import ProductShowcase from "./components/ProductShowcase";
import Footer from "./components/Footer";
import Text from "./components/Text";

export default function Home() {
  return (
    <div>
      <Header/>
      <ProductShowcase/>
      <Text></Text>
      <Footer></Footer>
    </div>
  );
}

"use client";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ProductList from "./components/ProductList";

export default function Home() {
  return (
    <>
      <Header />
      <ProductList />
      <Footer />
    </>
  );
}

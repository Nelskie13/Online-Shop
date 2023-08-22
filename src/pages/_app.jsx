import "@/styles/globals.css";
import Providers from "../Redux-store/provider";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Shop",
  description: "Online shop store with authentication",
};

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Providers>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Providers>
    </div>
  );
}

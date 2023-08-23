import "@/styles/globals.css";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { Inter } from "next/font/google";
import Head from "next/head";
import dynamic from "next/dynamic";

const Providers = dynamic(() => import("../Redux-store/provider"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Shop",
  description: "Online shop store with authentication",
};

export default function App({ Component, pageProps }) {
  return (
    <div className={inter.className}>
      <Providers>
        <Head>{metadata.title}</Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Providers>
    </div>
  );
}

import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./Redux-store/provider";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Shop",
  description: "Online shop store with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

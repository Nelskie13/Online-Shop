import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./Redux-store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Online Shop",
  description: "Online shop store with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

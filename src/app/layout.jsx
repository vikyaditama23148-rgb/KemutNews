import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "KEMUTNEWS — Satu Keluarga, Banyak Cerita",
    template: "%s — KEMUTNEWS",
  },
  description:
    "KEMUTNEWS adalah media informasi dan dokumentasi digital keluarga besar KEMUT — kabar, kegiatan, tokoh, dan cerita komunitas.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <TopBar />
        <Header />
        <BreakingNews />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

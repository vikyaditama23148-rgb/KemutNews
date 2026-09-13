import { Merriweather, Public_Sans } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import BreakingNews from "@/components/BreakingNews";
import Footer from "@/components/Footer";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata = {
  title: {
    default: "KEMUTNEWS — Jurnalisme Komprehensif & Independen",
    template: "%s — KEMUTNEWS",
  },
  description:
    "KEMUTNEWS adalah media informasi dan dokumentasi digital keluarga besar KEMUT — kabar, kegiatan, tokoh, dan cerita komunitas.",
};

// Paksa seluruh halaman selalu mengambil data terbaru dari Supabase pada
// setiap kunjungan, alih-alih dibekukan (statis) saat proses build/deploy.
// Tanpa ini, artikel/tokoh/dll yang ditambahkan setelah deploy terakhir
// tidak akan muncul di halaman publik sampai ada deploy berikutnya.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={`${merriweather.variable} ${publicSans.variable}`}>
        <TopBar />
        <Header />
        <BreakingNews />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
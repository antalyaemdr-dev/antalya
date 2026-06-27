import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Nunito fontunu çağırıyoruz
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Kullanacağımız kalınlıklar
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Antalya EMDR & Psikolojik Danışmanlık",
  description: "Meryem Gül Eren yönetiminde profesyonel terapi hizmetleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      {/* nunito.className ile tüm siteye fontu giydiriyoruz */}
      <body
        className={`${nunito.className} min-h-screen flex flex-col antialiased`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
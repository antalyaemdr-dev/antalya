import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      <body className={`${nunito.className} min-h-screen flex flex-col antialiased bg-sand-light`}>
        {children}
        <CookieConsent /> {/* Çerez uyarısı artık body içinde ve görünür durumda */}
      </body>
    </html>
  );
}
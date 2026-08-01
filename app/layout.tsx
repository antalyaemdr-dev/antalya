import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import { GoogleAnalytics } from '@next/third-parties/google';


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
      <head>
        {/* GOOGLE SEARCH CONSOLE DOĞRULAMA KODU */}
        <meta name="google-site-verification" content="Q1G906VmyOzEIna-_ZMgv0FYm9ahBvFbzNL5173O4ig" />
      </head>
      <body className={`${nunito.className} min-h-screen flex flex-col antialiased bg-sand-light`}>
        {children}
        <CookieConsent /> {/* Çerez uyarısı artık body içinde ve görünür durumda */}
        <GoogleAnalytics gaId="G-2BNB10EW26" />
      </body>
    </html>
  );
}
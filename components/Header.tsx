"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Sayfa değiştiğinde mobil menüyü otomatik kapat
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Menü açıkken arka planın kaymasını engelle
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımda", href: "/hakkimda" },
    { name: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { name: "Blog", href: "/blog" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <>
      {/* Üst Menü Sabit Yüksekliği: h-[88px] - Bu değer Hero'nun boyunu hesaplamak için çok önemli */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 h-[88px] flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Sol: Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* Not: Aşağıdaki src kısmına kendi logonuzun yolunu yazın (örn: /logo.png) */}
            <img src="/images/logo/logo.webp" alt="Antalya EMDR Logo" className="h-12 w-auto object-contain" />
          </Link>

          {/* Orta: Masaüstü Linkler */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-bold transition-colors ${
                  pathname === link.href ? "text-[#006699] border-b-2 border-[#006699]" : "text-gray-600 hover:text-[#006699]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Sağ: Masaüstü Buton & Mobil Hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/randevu"
              className="hidden md:flex bg-[#006699] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#004d73] transition-colors"
            >
              Randevu Al
            </Link>
            
            {/* Mobil Menü Açma Butonu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-gray-600 hover:text-[#006699] transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* --- MOBİL MENÜ ÇEKMECESİ (OFF-CANVAS) --- */}
      {/* Karanlık Arka Plan (Overlay) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Sağdan Gelen Menü Paneli */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <span className="font-extrabold text-[#006699]">Menü</span>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-grow p-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center justify-between p-3 rounded-xl font-bold transition-colors ${
                pathname === link.href ? "bg-[#006699]/10 text-[#006699]" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {link.name}
              <ChevronRight size={16} className={pathname === link.href ? "text-[#006699]" : "text-gray-300"} />
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-gray-100">
          <Link
            href="/randevu"
            className="w-full flex justify-center bg-[#006699] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#004d73] transition-colors shadow-lg shadow-[#006699]/30"
          >
            Hemen Randevu Al
          </Link>
        </div>
      </div>
    </>
  );
}
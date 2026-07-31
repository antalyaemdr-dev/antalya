"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase"; // Supabase yolunuzu kontrol edin

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false); // Mobilde açılır menü için
  const [services, setServices] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isMenuOpen]);

  // Menü için hizmetleri sıra numarasına göre (sort_order) çekiyoruz
  useEffect(() => {
    const fetchServicesForMenu = async () => {
      const { data } = await supabase.from("services").select("title, slug").order("sort_order", { ascending: true });
      if (data) setServices(data);
    };
    fetchServicesForMenu();
  }, []);

  return (
    <>
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 h-[88px] flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="/images/logo/logo.webp" alt="Antalya EMDR Logo" className="h-12 w-auto object-contain" />
          </Link>

          <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
            <Link href="/" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>Ana Sayfa</Link>
            <Link href="/hakkimda" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/hakkimda" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>Hakkımda</Link>
            
            {/* HİZMETLERİMİZ AÇILIR MENÜSÜ (DROPDOWN) */}
            <div className="relative group py-2">
              <Link href="/hizmetlerimiz" className={`flex items-center gap-1 text-[15px] font-bold transition-colors ${pathname.includes("/hizmetlerimiz") ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>
                Hizmetlerimiz <ChevronDown size={14} className="transform group-hover:rotate-180 transition-transform" />
              </Link>
              
              {/* Dropdown Kutusu */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
                <div className="p-2 flex flex-col">
                  <Link href="/hizmetlerimiz" className="px-4 py-2 text-[#006699] font-extrabold text-sm border-b border-gray-50 mb-1 hover:bg-gray-50 rounded-lg">Tümünü Gör</Link>
                  {services.map(srv => (
                    <Link key={srv.slug} href={`/hizmetlerimiz/${srv.slug}`} className="px-4 py-2.5 text-gray-600 font-medium text-sm hover:text-[#006699] hover:bg-[#006699]/5 rounded-xl transition-colors">
                      {srv.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/emdr-danismanlik" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/emdr-danismanlik" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>EMDR Danışmanlık</Link>
            <Link href="/blog" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/blog" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>Blog</Link>
            <Link href="/oneriler" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/oneriler" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>Öneriler</Link>
            <Link href="/online-testler" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/online-testler" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>Online Testler</Link>
            <Link href="/iletisim" className={`text-[15px] font-bold transition-colors py-2 ${pathname === "/iletisim" ? "text-[#006699]" : "text-gray-700 hover:text-[#006699]"}`}>İletişim</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/randevu" className="hidden md:flex bg-[#006699] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-[#004d73] transition-colors">
              Randevu Al
            </Link>
            <button onClick={() => setIsMenuOpen(true)} className="lg:hidden p-2 text-gray-600 hover:text-[#006699]">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBİL MENÜ */}
      <div className={`fixed inset-0 bg-black/60 z-[60] lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setIsMenuOpen(false)} />

      <div className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex justify-between items-center border-b">
          <span className="font-extrabold text-[#006699]">Menü</span>
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-gray-400 hover:text-red-500 bg-gray-50 rounded-full"><X size={24} /></button>
        </div>

        <nav className="flex-grow p-6 flex flex-col gap-2 overflow-y-auto">
          <Link href="/" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">Ana Sayfa</Link>
          <Link href="/hakkimda" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">Hakkımda</Link>
          
          {/* Mobil Hizmetler Akordeonu */}
          <div>
            <button onClick={() => setIsServicesOpen(!isServicesOpen)} className="w-full flex justify-between items-center p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">
              Hizmetlerimiz <ChevronDown size={16} className={`transform transition-transform ${isServicesOpen ? "rotate-180 text-[#006699]" : ""}`} />
            </button>
            {isServicesOpen && (
              <div className="pl-4 pr-2 py-2 flex flex-col gap-1 border-l-2 border-[#e6c15c] ml-3 mt-1">
                <Link href="/hizmetlerimiz" className="p-2 text-sm font-extrabold text-[#006699]">Tüm Hizmetler</Link>
                {services.map(srv => (
                  <Link key={srv.slug} href={`/hizmetlerimiz/${srv.slug}`} className="p-2 text-sm font-medium text-gray-600 hover:text-[#006699]">
                    {srv.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/emdr-danismanlik" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">EMDR Danışmanlık</Link>
          <Link href="/blog" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">Blog</Link>
          <Link href="/oneriler" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">Öneriler</Link>
          <Link href="/online-testler" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">Online Testler</Link>
          <Link href="/iletisim" className="p-3 font-bold text-gray-700 hover:bg-gray-50 rounded-xl">İletişim</Link>
        </nav>

        <div className="p-6 border-t">
          <Link href="/randevu" className="w-full flex justify-center bg-[#006699] text-white px-6 py-4 rounded-xl font-bold shadow-lg">Hemen Randevu Al</Link>
        </div>
      </div>
    </>
  );
}
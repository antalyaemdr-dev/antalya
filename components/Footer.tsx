"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Footer() {
  const [services, setServices] = useState<any[]>([]);

  // Hizmetleri menü için veritabanından çekiyoruz (İlk 5 hizmet)
  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from("services")
        .select("title, slug")
        .order("sort_order", { ascending: true })
        .limit(5);
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  return (
    <footer className="bg-[#031321] text-gray-300 pt-20 pb-10 mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Marka ve Hakkında (Logo Altı) */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-6 bg-white/5 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
            <img 
              src="/images/logo/logo.webp" 
              alt="Antalya EMDR Logo" 
              className="h-14 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" 
            />
          </Link>
          <div className="text-gray-400 text-sm leading-relaxed space-y-4 max-w-lg">
            <p className="font-extrabold text-white text-base">
              Psikolog / Avrupa Akredite EMDR Terapisti, Çift Aile Danışmanı
            </p>
            <p>
              23 yıllık deneyim sürecinde İstanbul’da Özel Eğitim, Rehabilitasyon, psikiyatri ve psikoterapi merkezlerinden sonra; Elika Psikoloji ve Danışmanlık merkezinde hem kurucu hem de Çift -Aile ve EMDR Terapisti olarak hizmet vermiştir. Şehir değişikliği nedeniyle İstanbul’daki ofis çalışmalarına, online olarak devam etmektedir.
            </p>
          </div>
        </div>
        
        {/* Hizmetlerimiz Menüsü */}
        <div>
          <h3 className="font-extrabold text-white mb-6 tracking-wide text-lg">Hizmetlerimiz</h3>
          <ul className="space-y-4 flex flex-col">
            {services.map(srv => (
              <Link key={srv.slug} href={`/hizmetlerimiz/${srv.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                {srv.title}
              </Link>
            ))}
            <Link href="/hizmetlerimiz" className="text-sm font-bold text-[#006699] hover:text-blue-400 transition-colors mt-2 inline-flex items-center">
              Tüm Hizmetler &rarr;
            </Link>
          </ul>
        </div>

        {/* Kurumsal Menüsü */}
        <div>
          <h3 className="font-extrabold text-white mb-6 tracking-wide text-lg">Kurumsal</h3>
          <ul className="space-y-4 flex flex-col">
            <Link href="/hakkimda" className="text-sm text-gray-400 hover:text-white transition-colors">Hakkımızda</Link>
            <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</Link>
            <Link href="/oneriler" className="text-sm text-gray-400 hover:text-white transition-colors">Öneriler</Link>
            <Link href="/iletisim" className="text-sm text-gray-400 hover:text-white transition-colors">İletişim</Link>
            <Link href="/kvkk" className="text-sm text-gray-400 hover:text-white transition-colors">KVKK Aydınlatma Metni</Link>
          </ul>
        </div>
      </div>
      
      {/* Alt Çizgi ve Telif Kısımları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-500 gap-4 text-center lg:text-left">
        <p>
          Copyright © 2026, AntalyaEmdr.com.tr web sitesi bir Elika Psikoloji ( <a href="https://www.elikapsikoloji.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#006699] transition-colors">www.elikapsikoloji.com</a> ) markasıdır
        </p>
        <p>
          Web Tasarım ve Yazılım <a href="https://www.eladesign.org" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#006699] transition-colors">Ela Teknoloji</a>
        </p>
      </div>
    </footer>
  );
}
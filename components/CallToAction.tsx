"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase"; // Supabase yolunu projene göre kontrol et

export default function CallToAction() {
  // Varsayılan metinler
  const [data, setData] = useState({
    cta_title: "Değişim İçin İlk Adımı Atmaya Hazır mısınız?",
    cta_subtitle: "İçsel yolculuğunuzda size eşlik etmek ve daha sağlıklı bir yarına adım atmanız için güvenli bir alan sunuyoruz.",
    cta_button_text: "Hemen Randevu Alın"
  });

  useEffect(() => {
    const fetchCtaData = async () => {
      const { data: homeData } = await supabase.from("home_page").select("cta_title, cta_subtitle, cta_button_text").eq("id", 1).single();
      if (homeData) {
        setData(prev => ({
          cta_title: homeData.cta_title || prev.cta_title,
          cta_subtitle: homeData.cta_subtitle || prev.cta_subtitle,
          cta_button_text: homeData.cta_button_text || prev.cta_button_text
        }));
      }
    };
    fetchCtaData();
  }, []);

  return (
    <section className="relative py-24 bg-[#006699] overflow-hidden">
      {/* Dekoratif Arka Plan Işıkları */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-[#e6c15c]/20 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Adminden gelen başlık */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {data.cta_title}
        </h2>
        
        {/* Adminden gelen alt metin */}
        <p className="text-lg md:text-xl text-white/70 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          {data.cta_subtitle}
        </p>
        
        {/* Adminden gelen buton metni */}
        <Link 
          href="/randevu" 
          className="inline-flex items-center justify-center px-10 py-5 bg-[#e6c15c] text-[#031321] text-lg font-extrabold rounded-xl hover:bg-white transition-all duration-300 shadow-xl shadow-[#e6c15c]/20 transform hover:-translate-y-1"
        >
          {data.cta_button_text}
        </Link>
      </div>
    </section>
  );
}
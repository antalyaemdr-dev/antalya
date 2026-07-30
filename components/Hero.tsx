"use client";

import { useState, useEffect, useCallback } from "react";
import Link from 'next/link';
import { ChevronRight, ChevronDown, ChevronLeft } from 'lucide-react';
import { supabase } from "../lib/supabase"; 
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  const [data, setData] = useState<any>(null);
  
  // Slider Ayarları: Sonsuz döngü ve 8 saniyede (8000ms) bir otomatik geçiş
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 }, 
    [Autoplay({ delay: 8000, stopOnInteraction: true })]
  );

  // Oklar için kaydırma fonksiyonları
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchHeroData = async () => {
      const { data: homeData } = await supabase.from("home_page").select("*").eq("id", 1).single();
      if (homeData) setData(homeData);
    };
    fetchHeroData();
  }, []);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight - 88, behavior: 'smooth' });
  };

  if (!data) return <div className="h-[calc(100dvh-88px)] bg-[#031321]"></div>;

  return (
    <section className="relative h-[calc(100dvh-88px)] w-full flex items-center justify-center overflow-hidden group">
      
      {/* 1. KATMAN: Sabit Arka Plan (Video veya Resim) */}
      {data.hero_media_type === 'video' ? (
        <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover z-0">
          <source src={data.hero_media_url} type="video/mp4" />
        </video>
      ) : (
        <img src={data.hero_media_url} alt="Kapak" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      )}

      <div className="absolute top-0 left-0 w-full h-full bg-[#031321]/60 z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#031321]/90 via-transparent to-[#031321]/90 z-10"></div>
      
      {/* 2. KATMAN: Kayan Metinler (Slider) */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto -mt-10 w-full">
        <span className="block text-[#e6c15c] italic tracking-wide text-xl md:text-2xl font-medium mb-6 drop-shadow-xl">
          "Sen Değiştiğinde, Her Şey Değişir."
        </span>
        
        {/* Slider Çerçevesi */}
        <div className="overflow-hidden w-full mb-10 cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex">
            {data.hero_slides?.map((slide: any, idx: number) => (
              <div key={idx} className="flex-[0_0_100%] min-w-0 transition-opacity px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
                  {slide.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/randevu" className="w-full sm:w-auto px-8 py-4 bg-[#006699] text-white rounded-xl font-bold hover:bg-[#004d73] transition-all flex items-center justify-center shadow-lg shadow-[#006699]/40">
            Hemen Randevu Al
          </Link>
          <Link href="/hizmetlerimiz" className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-2">
            Hizmetlerimizi İnceleyin <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* 3. KATMAN: Zarif Yön Okları */}
      {/* Slayt sayısı 1'den fazlaysa okları göster */}
      {data.hero_slides?.length > 1 && (
        <>
          <button 
            onClick={scrollPrev}
            className="absolute left-4 lg:left-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#e6c15c] border border-white/10 hover:border-[#e6c15c] text-white hover:text-[#031321] backdrop-blur-md transition-all duration-300 opacity-50 hover:opacity-100"
            aria-label="Önceki Slayt"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          
          <button 
            onClick={scrollNext}
            className="absolute right-4 lg:right-12 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#e6c15c] border border-white/10 hover:border-[#e6c15c] text-white hover:text-[#031321] backdrop-blur-md transition-all duration-300 opacity-50 hover:opacity-100"
            aria-label="Sonraki Slayt"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>
        </>
      )}

      {/* 4. KATMAN: Aşağı Kaydır Oku */}
      <div onClick={handleScroll} className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[#e6c15c] text-[10px] md:text-xs tracking-widest uppercase font-semibold">Aşağı Kaydır</span>
        <ChevronDown className="animate-bounce text-white mt-1" size={32} strokeWidth={1.5} />
      </div>
    </section>
  );
}
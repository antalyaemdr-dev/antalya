"use client";

import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';

export default function Hero() {
  
  const handleScroll = () => {
    // Header boyu (88px) kadar aşağı kaymasını sağlıyoruz
    window.scrollTo({
      top: window.innerHeight - 88,
      behavior: 'smooth'
    });
  };

  return (
    // DİKKAT: h-[calc(100dvh-88px)] ile ekran boyundan menü boyunu çıkarıyoruz. Tam oturacak!
    <section className="relative h-[calc(100dvh-88px)] w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. KATMAN: Arka Plan Videosu */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/kapak-hero.mp4" type="video/mp4" />
      </video>

      {/* 2. KATMAN: Kurumsal Renkli Sinematik Karartma */}
      {/* Saf siyah yerine logodaki deniz mavisinin çok koyu bir tonunu (Slate/Navy) kullanıyoruz */}
      <div className="absolute top-0 left-0 w-full h-full bg-[#031321]/60 z-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#031321]/90 via-transparent to-[#031321]/90 z-10"></div>
      
      {/* 3. KATMAN: İçerik ve Tipografi */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto -mt-10">
        
        {/* ALTIN SARISI - VURUCU SÖZ */}
        <span className="block text-[#e6c15c] italic tracking-wide text-xl md:text-2xl lg:text-3xl font-medium mb-6 drop-shadow-xl">
          "Sen Değiştiğinde, Her Şey Değişir."
        </span>
        
        {/* İddialı, büyük ana başlık */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
          İçsel Yolculuğunuza <br className="hidden md:block" />
          <span className="text-white/80 font-light">Profesyonel Rehberlik</span>
        </h1>
        
        {/* Alt metin */}
        <p className="text-lg md:text-xl text-white/80 mb-10 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
          Antalya'da EMDR terapisi ve yenilikçi psikolojik danışmanlık yaklaşımlarıyla hayatınızdaki düğümleri çözmek için buradayız.
        </p>
        
        {/* Kurumsal Aksiyon Butonları (Logodaki Mavi ve Beyaz Uyumu) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/randevu" 
            className="w-full sm:w-auto px-8 py-4 bg-[#006699] text-white rounded-xl font-bold hover:bg-[#004d73] transition-all flex items-center justify-center shadow-lg shadow-[#006699]/40"
          >
            Hemen Randevu Al
          </Link>
          <Link 
            href="/hizmetlerimiz" 
            className="w-full sm:w-auto px-8 py-4 border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md flex items-center justify-center gap-2"
          >
            Hizmetlerimizi İnceleyin <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      {/* 4. KATMAN: Şık Scroll Oku */}
      {/* Ok artık ekranın en altında güvende */}
      <div 
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer group"
      >
        <span className="text-[#e6c15c] text-[10px] md:text-xs tracking-widest uppercase font-semibold transition-colors">
          Aşağı Kaydır
        </span>
        <div className="animate-bounce mt-1">
          <ChevronDown className="text-white group-hover:text-[#e6c15c] transition-colors" size={32} strokeWidth={1.5} />
        </div>
      </div>

    </section>
  );
}
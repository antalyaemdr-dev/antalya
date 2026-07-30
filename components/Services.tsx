"use client";

import { useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Services() {
  // Sonsuz döngü (loop: true) ve otomatik kaydırma ayarları
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const services = [
    {
      id: 1,
      title: "EMDR Terapisi",
      description: "Travma ve stres bozukluklarının tedavisinde Avrupa akredite yaklaşımlarla kalıcı çözümler.",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=800",
      slug: "emdr-terapisi"
    },
    {
      id: 2,
      title: "Online Danışmanlık",
      description: "Mekandan bağımsız, kendi konfor alanınızda profesyonel ve kesintisiz psikolojik destek.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
      slug: "online-danismanlik"
    },
    {
      id: 3,
      title: "Bireysel Danışmanlık",
      description: "Kaygı, depresyon ve stres yönetimi süreçlerinde içsel dengenizi bulmanız için birebir rehberlik.",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=800",
      slug: "bireysel-danismanlik"
    },
    {
      id: 4,
      title: "Çift Danışmanlığı",
      description: "İlişki sorunları ve iletişim problemlerinde bağlarınızı güçlendirecek güvenli alan.",
      image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=800",
      slug: "cift-danismanligi"
    },
    {
      id: 5,
      title: "Aile Danışmanlığı",
      description: "Aile içi iletişim ve ebeveyn-çocuk ilişkilerinde sağlıklı dinamikler kurmaya yönelik profesyonel destek.",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800",
      slug: "aile-danismanligi"
    },
    {
      id: 6,
      title: "Psikolojik Testler",
      description: "Kişilik, zeka ve mesleki yönelim süreçlerinde bilimsel ve kapsamlı gelişimsel değerlendirmeler.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
      slug: "psikolojik-testler"
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Üst Kısım: Başlık ve Yön Tuşları */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block">
              Uzmanlık Alanlarımız
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#031321] leading-tight">
              Size Nasıl Yardımcı <br className="hidden md:block" /> Olabiliriz?
            </h2>
          </div>
          
          {/* Zarif Carousel Yön Tuşları */}
          <div className="flex gap-3">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#006699] hover:text-white hover:border-[#006699] transition-all"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#006699] hover:text-white hover:border-[#006699] transition-all"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Carousel Alanı */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] pl-6"
              >
                <Link href={`/hizmetlerimiz/${service.slug}`} className="block group">
                  <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 border border-gray-100">
                    
                    {/* Resim Alanı */}
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-[#031321]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      <img 
                        src={service.image} 
                        alt={service.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      />
                    </div>

                    {/* Sade ve Zarif İçerik Alanı */}
                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-[#031321] mb-4 group-hover:text-[#006699] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed font-light mb-8 line-clamp-2 min-h-[3rem]">
                        {service.description}
                     </p>
                      
                      {/* İnce Çizgili Detay Butonu */}
                      <div className="flex items-center text-sm font-bold text-[#006699] uppercase tracking-wider group-hover:text-[#e6c15c] transition-colors">
                        Detaylı İncele 
                        <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>

                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
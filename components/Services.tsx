"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "../lib/supabase"; // Yolunu projene göre kontrol et

export default function Services() {
  const [services, setServices] = useState<any[]>([]);

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

  // Veritabanından gerçek hizmetleri çekiyoruz
  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
      if (data) setServices(data);
    };
    fetchServices();
  }, []);

  // Henüz hizmet eklenmediyse alanı gizle
  if (services.length === 0) return null;

  return (
    <section className="py-24 bg-[#FAFAFA] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block">
              Uzmanlık Alanlarımız
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#031321] leading-tight">
              Size Nasıl Yardımcı <br className="hidden md:block" /> Olabiliriz?
            </h2>
          </div>
          
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

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex -ml-6">
            {services.map((service) => (
              <div 
                key={service.id} 
                className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333333%] pl-6"
              >
                <Link href={`/hizmetlerimiz/${service.slug}`} className="block group h-full">
                  <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-500 border border-gray-100">
                    
                    {/* Resim Alanı */}
                    <div className="relative h-72 overflow-hidden bg-gray-50">
                      <div className="absolute inset-0 bg-[#031321]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                      {service.image_url ? (
                        <img 
                          src={service.image_url} 
                          alt={service.title} 
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <ImageIcon size={48} />
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-[#031321] mb-4 group-hover:text-[#006699] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed font-light mb-8 line-clamp-2 min-h-[3rem]">
                        {service.short_description}
                      </p>
                      
                      <div className="flex items-center text-sm font-bold text-[#006699] uppercase tracking-wider group-hover:text-[#e6c15c] transition-colors mt-auto">
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
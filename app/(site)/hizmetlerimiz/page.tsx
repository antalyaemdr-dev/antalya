"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

export default function HizmetlerListesi() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
      if (data) setServices(data);
      setIsLoading(false);
    };
    fetchServices();
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#006699]">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-[#e6c15c] font-bold tracking-widest uppercase text-sm mb-3 block">Uzmanlık Alanlarımız</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#031321] uppercase tracking-wide">
            Hizmetlerimiz
          </h1>
          <div className="w-24 h-1 bg-[#006699] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service) => (
            <Link key={service.id} href={`/hizmetlerimiz/${service.slug}`} className="group block h-full">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                
                <div className="relative h-72 overflow-hidden bg-gray-50">
                  <div className="absolute inset-0 bg-[#031321]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  {service.image_url ? (
                    <img 
                      src={service.image_url} 
                      alt={service.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
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
                  <p className="text-gray-500 leading-relaxed font-light mb-8 line-clamp-3 flex-grow">
                    {service.short_description}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-[#006699] uppercase tracking-wider group-hover:text-[#e6c15c] transition-colors mt-auto">
                    Detaylı İncele 
                    <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
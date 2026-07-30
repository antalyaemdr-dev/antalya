"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function HizmetDetay() {
  const params = useParams();
  const slug = params?.slug as string;
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    const fetchService = async () => {
      const { data } = await supabase.from("services").select("*").eq("slug", slug).single();
      if (data) setService(data);
      setIsLoading(false);
    };
    
    fetchService();
  }, [slug]);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#006699]">Yükleniyor...</div>;
  if (!service) return <div className="min-h-screen flex items-center justify-center text-red-500 text-2xl font-bold">Hizmet Bulunamadı</div>;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      
      {/* Gizli stil bozulmalarını engelleyen ZARAFETLİ CSS */}
      <style dangerouslySetInnerHTML={{__html: `
        .clean-text * {
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
        }
      `}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigasyon İzi (Breadcrumb) */}
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-[#006699]">Ana Sayfa</Link>
          <ChevronRight size={14} />
          <Link href="/hizmetlerimiz" className="hover:text-[#006699]">Hizmetlerimiz</Link>
          <ChevronRight size={14} />
          <span className="text-[#006699]">{service.title}</span>
        </div>

        {/* Gerçek Kapak Resmi */}
        {service.image_url && (
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mb-12 relative">
            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#031321]/60 to-transparent"></div>
            <h1 className="absolute bottom-8 left-8 right-8 text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {service.title}
            </h1>
          </div>
        )}

        {/* Zengin Metin İçerik Alanı (Agresif temizleyici kaldırıldı) */}
        <div 
          className="clean-text prose prose-lg max-w-none w-full prose-headings:text-[#031321] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-loose prose-a:text-[#006699] prose-strong:text-[#031321] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: service.content || '' }} 
        />

        {/* Randevu Butonu */}
        <div className="mt-16 pt-10 border-t border-gray-100 text-center">
          <h3 className="text-2xl font-bold text-[#031321] mb-6">Bu Konuda Destek Almak İster misiniz?</h3>
          <Link href="/randevu" className="inline-flex items-center justify-center px-10 py-4 bg-[#e6c15c] text-[#031321] font-extrabold rounded-xl hover:bg-[#031321] hover:text-white transition-all shadow-lg">
            Hemen Randevu Oluşturun
          </Link>
        </div>

      </div>
    </div>
  );
}
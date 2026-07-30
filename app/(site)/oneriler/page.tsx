"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function OnerilerListesi() {
  const [items, setItems] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("Tümü");

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase.from("recommendations").select("*").order("created_at", { ascending: false });
      if (data) setItems(data);
    };
    fetchItems();
  }, []);

  const filters = ["Tümü", "Kitap", "Film", "Belgesel", "Podcast"];
  const filteredItems = activeFilter === "Tümü" ? items : items.filter(item => item.type === activeFilter);

  // Kopyala-yapıştır ile gelebilecek bozuk karakterleri ve HTML etiketlerini temizleyen fonksiyon
  const cleanText = (text: string) => {
    if (!text) return "";
    return text
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-[#e6c15c] font-bold tracking-widest uppercase text-sm mb-3 block">Kişisel Gelişim</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#031321]">Öneriler</h1>
        </div>

        {/* FİLTRELEME BUTONLARI */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map(f => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${activeFilter === f ? "bg-[#031321] text-white shadow-lg" : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* ÖNERİ KARTLARI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col group">
              <div className="relative h-72 bg-gray-100 overflow-hidden">
                {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />}
                <div className="absolute top-4 right-4 bg-[#e6c15c] text-[#031321] px-3 py-1 rounded-full text-xs font-bold shadow-md">{item.type}</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#031321] mb-3">{item.title}</h3>
                {/* cleanText fonksiyonunu açıklama metnine uyguluyoruz */}
                <p className="text-gray-500 text-sm leading-relaxed font-light">
                  {cleanText(item.description)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
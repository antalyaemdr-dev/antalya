"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { ArrowUpRight } from "lucide-react";

export default function OnlineTestler() {
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      const { data } = await supabase.from("online_tests").select("*").order("created_at", { ascending: false });
      if (data) setTests(data);
      setIsLoading(false);
    };
    fetchTests();
  }, []);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#006699]">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-[#e6c15c] font-bold tracking-widest uppercase text-sm mb-3 block">Değerlendirme Ölçekleri</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#031321] uppercase tracking-wide">
            Online Testler
          </h1>
          <div className="w-24 h-1 bg-[#006699] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {tests.map((test) => (
            <a 
              key={test.id} 
              href={test.external_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <h3 className="text-center text-xl font-bold text-[#031321] mb-4 group-hover:text-[#006699] transition-colors">
                {test.title}
              </h3>
              <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video">
                <img 
                  src={test.image_url} 
                  alt={test.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                {/* Hover Efekti */}
                <div className="absolute inset-0 bg-[#031321]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-[#e6c15c] text-[#031321] px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    Teste Başla <ArrowUpRight size={18} />
                  </span>
                </div>
              </div>
              {test.description && (
                <p className="text-center text-gray-500 mt-4 text-sm px-4 line-clamp-2">
                  {test.description}
                </p>
              )}
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
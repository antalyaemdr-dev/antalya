"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AboutSummary() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: homeData } = await supabase.from("home_page").select("*").eq("id", 1).single();
      if (homeData) setData(homeData);
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 border-2 border-[#e6c15c] rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform duration-500 hover:translate-x-6 hover:translate-y-6"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] group">
              <img 
                src={data.about_image_url} 
                alt={data.about_title}
                className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-[#031321]/5"></div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block">
              {data.about_subtitle}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#031321] mb-8 leading-tight">
              {data.about_title}
            </h2>
            
            <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg whitespace-pre-line">
              {data.about_text}
              
              {data.about_quote && (
                <div className="pt-4 pb-2">
                  <p className="font-medium text-[#031321] italic border-l-4 border-[#e6c15c] pl-5 py-2 text-xl">
                    "{data.about_quote}"
                  </p>
                </div>
              )}
            </div>

            <div className="mt-10">
              <Link 
                href="/hakkimda"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#031321] text-white rounded-xl font-bold hover:bg-[#006699] transition-all shadow-lg shadow-[#031321]/20 group"
              >
                Hakkımda Daha Fazla Bilgi
                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
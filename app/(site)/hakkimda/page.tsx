"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "../../../lib/supabase";
import { ChevronDown, X, Award, GraduationCap, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function Hakkimda() {
  const [pageData, setPageData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<string | null>(null);
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchPage = async () => {
      const { data } = await supabase.from("about_page").select("*").eq("id", 1).single();
      if (data) setPageData(data);
      setIsLoading(false);
    };
    fetchPage();
  }, []);

  const cleanHtml = (content: string) => {
    if (!content) return "";
    return content
      .replace(/&nbsp;/g, " ")
      .replace(/&#160;/g, " ")
      .replace(/style="[^"]*word-break[^"]*"/gi, '')
      .replace(/style="[^"]*white-space[^"]*"/gi, '');
  };

  const scrollToBio = () => {
    const element = document.getElementById("detayli-ozgecmis");
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-[#006699] font-medium tracking-widest uppercase">Yükleniyor...</div>;
  if (!pageData) return null;

  return (
    <div className="min-h-screen bg-white">
      
      <style dangerouslySetInnerHTML={{__html: `
        .clean-text, .clean-text * {
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
          hyphens: none !important;
          background-color: transparent !important;
        }
      `}} />

      {/* =========================================
          BÖLÜM 1: AYDINLIK HERO & KISA ÖZGEÇMİŞ
      ========================================= */}
      <section className="pt-32 pb-24 relative overflow-hidden bg-[#FAFAFA]">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-[#006699]/5 rounded-full blur-[120px] z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="w-full lg:w-[55%] order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-[#e6c15c]"></span>
              <span className="text-[#006699] font-bold tracking-widest uppercase text-sm">Hakkımda</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-[#031321] mb-8 leading-tight">
              {pageData.title}
            </h1>
            
            <div 
              className="text-lg md:text-xl text-gray-600 font-light leading-relaxed mb-10 prose prose-lg prose-p:text-gray-600 prose-strong:text-[#031321] max-w-none clean-text"
              dangerouslySetInnerHTML={{ __html: cleanHtml(pageData.short_bio) }}
            />
            
            <button 
              onClick={scrollToBio}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#031321] text-white rounded-xl font-bold hover:bg-[#006699] transition-all shadow-xl shadow-[#031321]/10 group"
            >
              Tam Özgeçmişi Oku 
              <ChevronDown size={20} className="transform group-hover:translate-y-1 transition-transform" />
            </button>
          </div>

          {pageData.image_url && (
            <div className="w-full lg:w-[40%] order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[320px] lg:max-w-[380px]">
                <div className="absolute -inset-4 border-2 border-[#e6c15c] rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-white">
                  <img 
                    src={pageData.image_url} 
                    alt={pageData.title} 
                    className="w-full h-full object-cover object-top" 
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================
          BÖLÜM 2: TAM ÖZGEÇMİŞ (OKUMA ALANI)
      ========================================= */}
      <section id="detayli-ozgecmis" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
          <div className="clean-text prose prose-lg max-w-none w-full prose-headings:text-[#031321] prose-headings:font-bold prose-p:text-gray-600 prose-p:font-light prose-p:leading-loose prose-a:text-[#006699] prose-strong:text-[#031321]" 
               dangerouslySetInnerHTML={{ __html: cleanHtml(pageData.content) }} />
        </div>
      </section>

      {/* =========================================
          BÖLÜM 3: EĞİTİM VE SERTİFİKALAR
      ========================================= */}
      <section className="py-24 bg-[#FAFAFA] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-20">
            
            <div className="w-full lg:w-1/3">
              <div className="flex items-center gap-3 mb-12">
                <GraduationCap className="text-[#006699] w-8 h-8" />
                <h2 className="text-3xl font-extrabold text-[#031321]">Eğitim Geçmişim</h2>
              </div>
              
              <div className="relative border-l-2 border-[#e6c15c]/30 ml-4 space-y-10">
                {pageData.educations?.map((edu: any, idx: number) => (
                  <div key={idx} className="relative pl-8 group">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#e6c15c] group-hover:bg-[#006699] group-hover:border-[#006699] transition-colors"></div>
                    <span className="block text-sm font-bold text-[#006699] mb-1 tracking-wider">{edu.year}</span>
                    <h3 className="text-xl font-bold text-[#031321] mb-1">{edu.title}</h3>
                    <p className="text-gray-500 font-light">{edu.school}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
                <div className="flex items-center gap-3">
                  <Award className="text-[#006699] w-8 h-8" />
                  <h2 className="text-3xl font-extrabold text-[#031321]">Sertifikalar ve Başarılar</h2>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={scrollPrev}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#006699] hover:text-white hover:border-[#006699] transition-all"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                  </button>
                  <button 
                    onClick={scrollNext}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#006699] hover:text-white hover:border-[#006699] transition-all"
                  >
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              
              <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                <div className="flex -ml-6 py-4">
                  {pageData.certificates?.map((cert: any, idx: number) => (
                    <div key={idx} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_35%] pl-6">
                      <div 
                        onClick={() => setSelectedCert(cert.image_url)}
                        className="group relative bg-white p-2 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 cursor-zoom-in border border-gray-100"
                      >
                        <div className="aspect-[4/3] rounded-xl overflow-hidden relative">
                          <img src={cert.image_url} alt="Sertifika" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-[#006699]/0 group-hover:bg-[#006699]/10 transition-colors"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* =========================================
          BÖLÜM 4: DETAYLI BİLGİLER (EN ALT LİSTE)
      ========================================= */}
      {pageData.detailed_info && pageData.detailed_info !== "<p><br></p>" && (
        <section className="py-24 bg-white border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
            <h2 className="text-3xl font-extrabold text-center text-[#031321] mb-16">Ek Eğitim ve Seminerler</h2>
            <div className="clean-text prose prose-lg max-w-none w-full prose-headings:text-[#031321] prose-headings:font-bold prose-p:text-gray-600 prose-ul:text-gray-600 prose-li:marker:text-[#006699] prose-a:text-[#006699]" 
                 dangerouslySetInnerHTML={{ __html: cleanHtml(pageData.detailed_info) }} />
          </div>
        </section>
      )}

      {/* SERTİFİKA POPUP (LIGHTBOX) */}
      {selectedCert && (
        <div 
          className="fixed inset-0 z-[100] bg-[#031321]/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out transition-opacity"
          onClick={() => setSelectedCert(null)}
        >
          <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all">
            <X size={28} />
          </button>
          <img src={selectedCert} alt="Sertifika Detay" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl ring-1 ring-white/10" />
        </div>
      )}

    </div>
  );
}
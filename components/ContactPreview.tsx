"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase"; 
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPreview() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  if (!settings) return null; 

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Arka plan mavi yapıldı */}
        <div className="bg-[#006699] rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          
          {/* Sol: İletişim Bilgileri */}
          <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#e6c15c]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block relative z-10">
              Bize Ulaşın
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-10 relative z-10">
              İletişime Geçin
            </h2>

            <div className="space-y-8 relative z-10">
              <div className="flex items-start group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#e6c15c] group-hover:bg-[#e6c15c] group-hover:text-[#006699] transition-all flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-blue-200 text-sm mb-1">Telefon</p>
                  <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="text-white text-xl font-medium hover:text-[#e6c15c] transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#e6c15c] group-hover:bg-[#e6c15c] group-hover:text-[#006699] transition-all flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-blue-200 text-sm mb-1">E-Posta</p>
                  <a href={`mailto:${settings.email}`} className="text-white text-lg font-medium hover:text-[#e6c15c] transition-colors">
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#e6c15c] group-hover:bg-[#e6c15c] group-hover:text-[#006699] transition-all flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div className="ml-6">
                  <p className="text-blue-200 text-sm mb-1">Klinik Adresi</p>
                  <p className="text-white text-lg font-medium whitespace-pre-line">
                    {settings.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sağ: Çalışma Saatleri */}
          <div className="w-full lg:w-1/2 bg-[#FAFAFA] p-12 lg:p-16 flex flex-col justify-center border-l border-gray-100">
            <div className="mb-8 flex items-center gap-3">
              <Clock className="text-[#006699]" size={28} />
              <h3 className="text-2xl font-bold text-[#031321]">Çalışma Saatleri</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Pazartesi - Cuma</span>
                <span className="text-[#031321] font-bold">{settings.working_hours_week}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200">
                <span className="text-gray-600 font-medium">Cumartesi</span>
                <span className="text-[#031321] font-bold">{settings.working_hours_weekend}</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="text-gray-600 font-medium">Pazar</span>
                <span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-lg">Kapalı</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export default function Iletisim() {
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
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <span className="text-[#e6c15c] font-bold tracking-widest uppercase text-sm mb-3 block">İletişim</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#031321]">Bize Ulaşın</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* İletişim Bilgileri */}
          <div className="space-y-10">
            <div className="bg-[#FAFAFA] p-8 rounded-3xl border border-gray-100">
              <h2 className="text-2xl font-bold text-[#031321] mb-8">Klinik Bilgileri</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006699]/10 rounded-xl flex items-center justify-center text-[#006699] flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Adres</p>
                    <p className="text-[#031321] text-lg font-medium whitespace-pre-line">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006699]/10 rounded-xl flex items-center justify-center text-[#006699] flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Telefon</p>
                    <a href={`tel:${settings.phone}`} className="text-[#031321] text-lg font-medium hover:text-[#e6c15c] transition-colors">{settings.phone}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">WhatsApp</p>
                    <a href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="text-[#031321] text-lg font-medium hover:text-green-600 transition-colors">Hızlı Mesaj Gönder</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#006699]/10 rounded-xl flex items-center justify-center text-[#006699] flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">E-Posta</p>
                    <a href={`mailto:${settings.email}`} className="text-[#031321] text-lg font-medium hover:text-[#e6c15c] transition-colors">{settings.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#031321] p-8 rounded-3xl text-white">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-[#e6c15c]" size={28} />
                <h3 className="text-2xl font-bold">Çalışma Saatleri</h3>
              </div>
              <div className="space-y-4 text-white/80">
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span>Pazartesi - Cuma</span>
                  <span className="font-bold text-white">{settings.working_hours_week}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span>Cumartesi</span>
                  <span className="font-bold text-white">{settings.working_hours_weekend}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pazar</span>
                  <span className="text-[#e6c15c] font-bold">Kapalı</span>
                </div>
              </div>
            </div>
          </div>

          {/* Harita */}
          <div className="h-full min-h-[500px] bg-gray-100 rounded-3xl overflow-hidden shadow-inner">
             {/* Not: Gerçek lokasyonunuzun Google Maps "Embed" kodundaki src linkini buraya yapıştırabilirsiniz */}
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3189.587217983056!2d30.68652031529342!3d36.924294079922986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c391eb392fb25f%3A0xc68297b6ffbe1ab0!2sMuratpa%C5%9Fa%2C%20Antalya!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>

        </div>
      </div>
    </div>
  );
}
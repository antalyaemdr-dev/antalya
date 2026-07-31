"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Save, Phone, Mail, MapPin, MessageCircle, Search } from "lucide-react";

export default function Ayarlar() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    working_hours_week: "",
    working_hours_weekend: "",
    meta_title: "",
    meta_description: ""
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from("site_settings").select("*").eq("id", 1).single();
    if (data) setSettings(data);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from("site_settings")
      .update(settings)
      .eq("id", 1);

    if (!error) {
      alert("Ayarlar başarıyla güncellendi!");
    } else {
      alert("Bir hata oluştu.");
    }
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">İletişim ve Site Ayarları</h1>
        <p className="text-gray-500 mt-2">Sitedeki tüm iletişim kanalları bu panele bağlıdır. Buradan yapacağınız değişiklik anında tüm siteye yansır.</p>
      </div>

      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Phone size={16} className="text-[#006699]"/> Telefon Numarası</label>
            <input type="text" value={settings.phone || ""} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none" placeholder="+90 (555)..." />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><MessageCircle size={16} className="text-green-500"/> WhatsApp Numarası (Boşluksuz)</label>
            <input type="text" value={settings.whatsapp || ""} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none" placeholder="90555..." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Mail size={16} className="text-red-400"/> E-Posta Adresi</label>
          <input type="email" value={settings.email || ""} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><MapPin size={16} className="text-orange-500"/> Klinik Adresi</label>
          <textarea rows={3} value={settings.address || ""} onChange={(e) => setSettings({...settings, address: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none resize-none" />
        </div>

        <hr className="border-gray-100 my-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Hafta İçi Mesai Saatleri</label>
            <input type="text" value={settings.working_hours_week || ""} onChange={(e) => setSettings({...settings, working_hours_week: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none" placeholder="09:00 - 19:00" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Cumartesi Mesai Saatleri</label>
            <input type="text" value={settings.working_hours_weekend || ""} onChange={(e) => setSettings({...settings, working_hours_weekend: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none" placeholder="10:00 - 17:00" />
          </div>
        </div>

        <hr className="border-gray-100 my-6" />

        {/* YENİ: SEO Ayarları Alanı */}
        <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100">
          <h2 className="text-lg font-bold text-[#006699] mb-4 flex items-center gap-2"><Search size={18} /> SEO ve Arama Motoru Ayarları</h2>
          <p className="text-xs text-gray-500 mb-4">Bu alan, tekil sayfalarda özel bir başlık veya açıklama girilmediğinde Google'da görünecek varsayılan değerlerdir.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Varsayılan Meta Başlık (Title)</label>
              <input type="text" value={settings.meta_title || ""} onChange={(e) => setSettings({...settings, meta_title: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none" placeholder="Örn: Antalya EMDR ve Psikolojik Danışmanlık" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Varsayılan Meta Açıklama (Description)</label>
              <textarea rows={2} value={settings.meta_description || ""} onChange={(e) => setSettings({...settings, meta_description: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#006699] outline-none resize-none" placeholder="Örn: Merkezimizde EMDR terapisi ve psikolojik danışmanlık hizmetleri verilmektedir." />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full mt-6 bg-[#006699] text-white py-4 rounded-xl font-bold hover:bg-[#004d73] transition-all flex items-center justify-center gap-2 text-lg">
          <Save size={20} /> {isLoading ? "Kaydediliyor..." : "Ayarları Güncelle"}
        </button>
      </form>
    </div>
  );
}
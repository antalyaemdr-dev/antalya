"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Calendar, User, Phone, Mail, Send } from "lucide-react";

export default function RandevuSayfasi() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: "", phone: "", email: "", service_type: "EMDR Terapisi", preferred_date: "", message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Ad Soyad alanını boşluktan ikiye bölüp first_name ve last_name yapıyoruz
      const nameParts = formData.full_name.trim().split(' ');
      const first_name = nameParts.slice(0, -1).join(' ') || formData.full_name;
      const last_name = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";

      const dbData = {
        first_name: first_name,
        last_name: last_name,
        phone: formData.phone,
        email: formData.email,
        service_type: formData.service_type,
        preferred_date: formData.preferred_date,
        message: formData.message
      };

      // 1. Veritabanına Kaydet
      await supabase.from("appointments").insert([dbData]);

      // 2. Mail Gönder (API'ye eski formData'yı atıyoruz ki mail formatı bozulmasın)
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'appointment', data: formData })
      });

      setIsSuccess(true);
      setFormData({ full_name: "", phone: "", email: "", service_type: "EMDR Terapisi", preferred_date: "", message: "" });
    } catch (error) {
      alert("Bir hata oluştu, lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <span className="text-[#e6c15c] font-bold tracking-widest uppercase text-sm mb-3 block">Online Rezervasyon</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#031321] mb-6">Randevu Talebi Oluşturun</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">Formu doldurduktan sonra en kısa sürede sizinle iletişime geçerek randevu saatinizi kesinleştireceğiz.</p>
        </div>

        {isSuccess ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Talebiniz Alındı!</h2>
            <p className="text-green-600">Randevu talebiniz bize başarıyla ulaştı. En kısa sürede sizinle iletişime geçeceğiz.</p>
            <button onClick={() => setIsSuccess(false)} className="mt-8 bg-green-600 text-white px-8 py-3 rounded-xl font-bold">Yeni Talep Oluştur</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><User size={16}/> Ad Soyad</label>
                <input required type="text" value={formData.full_name} onChange={(e) => setFormData({...formData, full_name: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699] focus:bg-white transition-all" placeholder="Adınız Soyadınız" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Phone size={16}/> Telefon Numarası</label>
                <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699] focus:bg-white transition-all" placeholder="0 (555) 000 00 00" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Mail size={16}/> E-Posta (İsteğe Bağlı)</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699] focus:bg-white transition-all" placeholder="ornek@mail.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2"><Calendar size={16}/> Tercih Edilen Tarih</label>
                <input type="date" value={formData.preferred_date} onChange={(e) => setFormData({...formData, preferred_date: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699] focus:bg-white transition-all text-gray-600" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Hizmet Seçimi</label>
                <select value={formData.service_type} onChange={(e) => setFormData({...formData, service_type: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699] focus:bg-white transition-all">
                  <option value="EMDR Terapisi">EMDR Terapisi</option>
                  <option value="Bireysel Danışmanlık">Bireysel Danışmanlık</option>
                  <option value="Çift Terapisi">Çift Terapisi</option>
                  <option value="Online Danışmanlık">Online Danışmanlık</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Eklemek İstedikleriniz (Kısaca)</label>
                <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699] focus:bg-white transition-all resize-none" placeholder="Bize iletmek istediğiniz notlar..." />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-[#031321] text-white py-5 rounded-xl font-extrabold text-lg hover:bg-[#006699] transition-all flex items-center justify-center gap-2 shadow-xl">
              {isLoading ? "Gönderiliyor..." : <><Send size={20}/> Randevu Talebini Gönder</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
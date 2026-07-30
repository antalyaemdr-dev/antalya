"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { CheckCircle2, ChevronRight, ChevronLeft, Monitor, Users, Sparkles } from "lucide-react";

export default function Randevu() {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form Verileri
  const [formData, setFormData] = useState({
    service: "",
    type: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Sayfa yüklendiğinde Supabase'den aktif hizmetleri çek
  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from("services").select("title").eq("is_active", true);
      if (data) setServices(data);
      setIsLoading(false);
    }
    fetchServices();
  }, []);

  // Form Gönderme İşlemi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("appointments").insert([formData]);

    setIsSubmitting(false);
    
    if (!error) {
      setIsSuccess(true);
      // İleride buraya E-posta bildirim tetikleyicisi (örnek: Resend/Nodemailer) eklenecek
    } else {
      alert("Bir hata oluştu, lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="min-h-screen bg-sand-light/30 py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        
        {/* Başlık Alanı */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Randevu Oluştur</h1>
          <p className="text-gray-600 font-medium">Size en uygun hizmeti seçerek ilk adımı atın.</p>
        </div>

        {isSuccess ? (
          // BAŞARILI EKRANI
          <div className="bg-white p-12 rounded-3xl shadow-xl border border-sand-dark/20 text-center">
            <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Talebiniz Alındı!</h2>
            <p className="text-gray-600 mb-8 text-lg">
              Sayın {formData.first_name}, randevu talebiniz başarıyla bize ulaştı. Müsaitlik durumuna göre en kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <button onClick={() => window.location.href = '/'} className="bg-mediterranean text-white px-8 py-3 rounded-xl font-bold hover:bg-mediterranean-dark transition-all">
              Ana Sayfaya Dön
            </button>
          </div>
        ) : (
          // FORM ALANI
          <div className="bg-white rounded-3xl shadow-xl border border-sand-dark/10 overflow-hidden">
            
            {/* İlerleme Çubuğu */}
            <div className="bg-sand-light px-8 py-4 flex justify-between items-center border-b border-sand-dark/20">
              <div className={`text-sm font-bold ${step >= 1 ? 'text-mediterranean' : 'text-gray-400'}`}>1. Hizmet</div>
              <div className={`h-1 w-12 rounded-full ${step >= 2 ? 'bg-mediterranean' : 'bg-gray-200'}`}></div>
              <div className={`text-sm font-bold ${step >= 2 ? 'text-mediterranean' : 'text-gray-400'}`}>2. Görüşme Tipi</div>
              <div className={`h-1 w-12 rounded-full ${step >= 3 ? 'bg-mediterranean' : 'bg-gray-200'}`}></div>
              <div className={`text-sm font-bold ${step >= 3 ? 'text-mediterranean' : 'text-gray-400'}`}>3. Bilgiler</div>
            </div>

            <div className="p-8 md:p-12">
              
              {/* ADIM 1: HİZMET SEÇİMİ */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Hangi hizmetten faydalanmak istersiniz?</h3>
                  {isLoading ? (
                    <div className="text-center py-8 text-gray-500">Hizmetler yükleniyor...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((srv, idx) => (
                        <button
                          key={idx}
                          onClick={() => setFormData({ ...formData, service: srv.title })}
                          className={`p-6 rounded-2xl border-2 text-left flex items-start gap-4 transition-all duration-200 ${
                            formData.service === srv.title 
                              ? 'border-mediterranean bg-mediterranean/5 shadow-md' 
                              : 'border-gray-100 hover:border-sand-dark/50 hover:bg-sand-light/50'
                          }`}
                        >
                          <Sparkles className={`w-6 h-6 flex-shrink-0 ${formData.service === srv.title ? 'text-mediterranean' : 'text-gray-400'}`} />
                          <span className={`font-bold text-lg ${formData.service === srv.title ? 'text-mediterranean-dark' : 'text-gray-700'}`}>
                            {srv.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mt-10 flex justify-end">
                    <button 
                      onClick={() => setStep(2)} 
                      disabled={!formData.service}
                      className="flex items-center gap-2 bg-mediterranean text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mediterranean-dark transition-all"
                    >
                      Devam Et <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* ADIM 2: GÖRÜŞME TİPİ */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Görüşme şeklini seçin</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <button
                      onClick={() => setFormData({ ...formData, type: "Online" })}
                      className={`p-8 rounded-2xl border-2 text-center flex flex-col items-center gap-4 transition-all duration-200 ${
                        formData.type === "Online" 
                          ? 'border-mediterranean bg-mediterranean/5 shadow-md' 
                          : 'border-gray-100 hover:border-sand-dark/50 hover:bg-sand-light/50'
                      }`}
                    >
                      <Monitor className={`w-12 h-12 ${formData.type === "Online" ? 'text-mediterranean' : 'text-gray-400'}`} />
                      <span className={`font-bold text-xl ${formData.type === "Online" ? 'text-mediterranean-dark' : 'text-gray-700'}`}>Online Danışmanlık</span>
                    </button>
                    
                    <button
                      onClick={() => setFormData({ ...formData, type: "Yüz Yüze" })}
                      className={`p-8 rounded-2xl border-2 text-center flex flex-col items-center gap-4 transition-all duration-200 ${
                        formData.type === "Yüz Yüze" 
                          ? 'border-mediterranean bg-mediterranean/5 shadow-md' 
                          : 'border-gray-100 hover:border-sand-dark/50 hover:bg-sand-light/50'
                      }`}
                    >
                      <Users className={`w-12 h-12 ${formData.type === "Yüz Yüze" ? 'text-mediterranean' : 'text-gray-400'}`} />
                      <span className={`font-bold text-xl ${formData.type === "Yüz Yüze" ? 'text-mediterranean-dark' : 'text-gray-700'}`}>Yüz Yüze Görüşme</span>
                    </button>
                  </div>
                  <div className="mt-10 flex justify-between">
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-800 transition-colors">
                      <ChevronLeft size={20} /> Geri
                    </button>
                    <button 
                      onClick={() => setStep(3)} 
                      disabled={!formData.type}
                      className="flex items-center gap-2 bg-mediterranean text-white px-8 py-3 rounded-xl font-bold disabled:opacity-50 hover:bg-mediterranean-dark transition-all"
                    >
                      Devam Et <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* ADIM 3: KİŞİSEL BİLGİLER */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileriniz</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Adınız *</label>
                      <input required type="text" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Soyadınız *</label>
                      <input required type="text" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">E-posta Adresiniz *</label>
                      <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Telefon Numaranız *</label>
                      <input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all" />
                    </div>
                  </div>
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Eklemek İstediğiniz Mesaj (Opsiyonel)</label>
                    <textarea rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all resize-none"></textarea>
                  </div>
                  
                  <div className="mt-10 flex justify-between items-center">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-2 text-gray-500 font-bold hover:text-gray-800 transition-colors">
                      <ChevronLeft size={20} /> Geri
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-mediterranean text-white px-10 py-4 rounded-xl font-bold disabled:opacity-70 hover:bg-mediterranean-dark hover:shadow-lg transition-all"
                    >
                      {isSubmitting ? 'Gönderiliyor...' : 'Randevu Talebini Gönder'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
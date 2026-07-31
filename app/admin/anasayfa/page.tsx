"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Save, Video, Megaphone, User, PlusCircle, Trash2, Image as ImageIcon, Search } from "lucide-react";

export default function AnasayfaYonetimi() {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [data, setData] = useState<any>({
    hero_media_type: "video",
    hero_media_url: "",
    cta_title: "",
    cta_subtitle: "",
    cta_button_text: "",
    about_image_url: "",
    about_subtitle: "",
    about_title: "",
    about_text: "",
    about_quote: "",
    meta_title: "",        // YENİ
    meta_description: ""   // YENİ
  });

  const [slides, setSlides] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: homeData } = await supabase.from("home_page").select("*").eq("id", 1).single();
      if (homeData) {
        setData(homeData);
        setSlides(homeData.hero_slides || []);
      }
    };
    fetchData();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileName = `home-${Math.random()}.${file.name.split('.').pop()}`;
      await supabase.storage.from('service-images').upload(fileName, file);
      const { data: urlData } = supabase.storage.from('service-images').getPublicUrl(fileName);
      setData({ ...data, [field]: urlData.publicUrl });
    } catch (err: any) {
      alert("Yükleme hatası: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const newSlides = [...slides];
    newSlides[index][field] = value;
    setSlides(newSlides);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.from("home_page").update({ ...data, hero_slides: slides }).eq("id", 1);
    if (!error) alert("Ana sayfa başarıyla güncellendi!");
    else alert("Hata: " + error.message);
    setIsLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Ana Sayfa Yönetimi</h1>
      </div>
      
      <form onSubmit={handleUpdate} className="space-y-8">
        
        {/* YENİ: SEO ALANI */}
        <div className="bg-blue-50/50 p-8 rounded-2xl shadow-sm border border-blue-100">
          <h2 className="text-xl font-bold text-[#006699] mb-6 border-b border-blue-200 pb-4 flex items-center gap-2">
            <Search size={24} /> Ana Sayfa SEO Ayarları
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Başlık (Title)</label>
              <input type="text" value={data.meta_title || ""} onChange={(e) => setData({...data, meta_title: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:border-[#006699]" placeholder="Opsiyonel" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Meta Açıklama (Description)</label>
              <input type="text" value={data.meta_description || ""} onChange={(e) => setData({...data, meta_description: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:border-[#006699]" placeholder="Kısa özet..." />
            </div>
          </div>
        </div>

        {/* 1. HERO SLAYT ALANI */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#031321] mb-6 border-b pb-4 flex items-center gap-2">
            <Video className="text-[#006699]" size={24} /> 1. Giriş Alanı Slaytları & Arka Plan
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Arka Plan Türü</label>
              <select value={data.hero_media_type} onChange={(e) => setData({...data, hero_media_type: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none focus:border-[#006699]">
                <option value="video">Video</option>
                <option value="image">Sabit Resim</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Medya Bağlantısı (URL)</label>
              <div className="flex gap-2">
                <input type="text" value={data.hero_media_url} onChange={(e) => setData({...data, hero_media_url: e.target.value})} className="flex-1 px-4 py-3 rounded-xl border outline-none focus:border-[#006699]" placeholder="/videos/kapak.mp4" />
                <label className="cursor-pointer bg-[#006699] text-white px-4 py-3 rounded-xl flex items-center hover:bg-[#004d73]">
                  <ImageIcon size={20}/>
                  <input type="file" accept="image/*,video/*" onChange={(e) => handleImageUpload(e, 'hero_media_url')} className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-800">Kayan Yazılar (Slaytlar)</h3>
            <button type="button" onClick={() => setSlides([...slides, { title: "", subtitle: "" }])} className="text-[#006699] font-bold flex items-center gap-1 hover:text-[#e6c15c]">
              <PlusCircle size={18}/> Slayt Ekle
            </button>
          </div>
          
          <div className="space-y-4">
            {slides.map((slide, idx) => (
              <div key={idx} className="bg-white border border-gray-200 p-4 rounded-xl relative group">
                <button type="button" onClick={() => setSlides(slides.filter((_, i) => i !== idx))} className="absolute top-4 right-4 text-red-400 hover:text-red-600">
                  <Trash2 size={20}/>
                </button>
                <label className="block text-sm font-bold text-gray-700 mb-1">Başlık</label>
                <input type="text" value={slide.title} onChange={(e) => updateSlide(idx, 'title', e.target.value)} className="w-full mb-3 px-4 py-2 border rounded-lg outline-none" />
                <label className="block text-sm font-bold text-gray-700 mb-1">Alt Açıklama</label>
                <textarea value={slide.subtitle} onChange={(e) => updateSlide(idx, 'subtitle', e.target.value)} rows={2} className="w-full px-4 py-2 border rounded-lg outline-none resize-none" />
              </div>
            ))}
          </div>
        </div>

        {/* 2. HAKKIMIZDA ÖZETİ */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#031321] mb-6 border-b pb-4 flex items-center gap-2">
            <User className="text-[#006699]" size={24} /> 2. Ana Sayfa "Hakkımda" Özeti
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Üst Unvan / Alt Başlık</label>
              <input type="text" value={data.about_subtitle} onChange={(e) => setData({...data, about_subtitle: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">İsim Başlığı</label>
              <input type="text" value={data.about_title} onChange={(e) => setData({...data, about_title: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none" />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Hakkımda Kısa Yazısı</label>
            <textarea rows={5} value={data.about_text} onChange={(e) => setData({...data, about_text: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none resize-none" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Vurgulu Alıntı (Sarı Çizgili Yazı)</label>
            <input type="text" value={data.about_quote} onChange={(e) => setData({...data, about_quote: e.target.value})} className="w-full px-4 py-3 rounded-xl border outline-none italic" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Fotoğraf</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-50 border p-4 rounded-xl">
                <ImageIcon className="inline mr-2" size={20}/> Resim Değiştir
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'about_image_url')} className="hidden" />
              </label>
              {data.about_image_url && <img src={data.about_image_url} className="h-16 rounded" />}
            </div>
          </div>
        </div>

        {/* 3. CTA */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#031321] mb-6 border-b pb-4 flex items-center gap-2">
            <Megaphone className="text-[#006699]" size={24} /> 3. Harekete Geçirici Mesaj (CTA)
          </h2>
          <div className="space-y-4">
            <input type="text" value={data.cta_title} onChange={(e) => setData({...data, cta_title: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="Başlık" />
            <input type="text" value={data.cta_subtitle} onChange={(e) => setData({...data, cta_subtitle: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="Açıklama" />
            <input type="text" value={data.cta_button_text} onChange={(e) => setData({...data, cta_button_text: e.target.value})} className="w-full px-4 py-3 border rounded-xl" placeholder="Buton Metni" />
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-[#031321] text-white py-5 rounded-2xl font-extrabold hover:bg-[#006699] shadow-xl text-lg flex items-center justify-center gap-2">
          <Save size={24} /> {isLoading ? "Kaydediliyor..." : "Tüm Değişiklikleri Kaydet"}
        </button>
      </form>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabase";
import { Save, Image as ImageIcon, PlusCircle, Trash2 } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

// Editörü SSR hatası almamak için dinamik yüklüyoruz
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function HakkimdaYonetimi() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Temel Alanlar
  const [title, setTitle] = useState("");
  const [shortBio, setShortBio] = useState(""); // Artık bu alan da editörden beslenecek
  const [content, setContent] = useState(""); 
  const [detailedInfo, setDetailedInfo] = useState(""); 
  const [imageUrl, setImageUrl] = useState("");
  
  // JSON (Liste) Alanları
  const [educations, setEducations] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    const { data } = await supabase.from("about_page").select("*").eq("id", 1).single();
    if (data) {
      setTitle(data.title || "");
      setShortBio(data.short_bio || "");
      setContent(data.content || "");
      setDetailedInfo(data.detailed_info || "");
      setImageUrl(data.image_url || "");
      setEducations(data.educations || []);
      setCertificates(data.certificates || []);
    }
  };

  // GENEL RESİM YÜKLEME (Profil & Sertifika)
  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `img-${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage.from('service-images').upload(fileName, file);
    if (error) throw error;
    const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
    return data.publicUrl;
  };

  // EĞİTİM YÖNETİMİ
  const addEducation = () => setEducations([...educations, { year: "", title: "", school: "" }]);
  const removeEducation = (index: number) => setEducations(educations.filter((_, i) => i !== index));
  const updateEducation = (index: number, field: string, value: string) => {
    const newEdu = [...educations];
    newEdu[index][field] = value;
    setEducations(newEdu);
  };

  // SERTİFİKA YÖNETİMİ
  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    try {
      const url = await uploadImage(e.target.files[0]);
      setCertificates([...certificates, { title: "Yeni Sertifika", image_url: url }]);
    } catch (err: any) {
      alert("Sertifika yüklenemedi: " + err.message);
    }
  };
  const removeCertificate = (index: number) => setCertificates(certificates.filter((_, i) => i !== index));

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.from("about_page").update({
      title, 
      short_bio: shortBio, 
      content, 
      detailed_info: detailedInfo, 
      image_url: imageUrl, 
      educations, 
      certificates
    }).eq("id", 1);

    if (!error) alert("Başarıyla kaydedildi!");
    else alert("Hata: " + error.message);
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto min-h-screen pb-32">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Detaylı Hakkımda Yönetimi</h1>
          <p className="text-gray-500 mt-2">Özgeçmiş, eğitimler ve sertifikalarınızı tek sayfadan yönetin.</p>
        </div>
        <button onClick={handleUpdate} disabled={isLoading} className="bg-[#006699] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#004d73] transition-all flex items-center gap-2 shadow-lg">
          <Save size={20} /> {isLoading ? "Kaydediliyor..." : "Tümünü Kaydet"}
        </button>
      </div>

      <div className="space-y-8">
        
        {/* 1. BÖLÜM: TEMEL BİLGİLER */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#031321] mb-6 border-b pb-4">1. Hero Alanı (Üst Kısım)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Başlık (İsim)</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Profil Fotoğrafı</label>
              <input type="file" onChange={async (e) => {
                if (e.target.files) setImageUrl(await uploadImage(e.target.files[0]));
              }} className="w-full" />
              {imageUrl && <img src={imageUrl} alt="Profil" className="h-16 mt-2 rounded-lg object-cover" />}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Kısa Özgeçmiş (Hero'da Görünen - Kalın yapabilirsiniz)</label>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <ReactQuill theme="snow" value={shortBio} onChange={setShortBio} className="h-40 mb-12" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Tam Özgeçmiş (Aşağı Kayınca Açılan)</label>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64 mb-12" />
            </div>
          </div>
        </div>

        {/* 2. BÖLÜM: EĞİTİM GEÇMİŞİ */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-[#031321]">2. Eğitim Geçmişim</h2>
            <button onClick={addEducation} className="text-[#006699] font-bold flex items-center gap-2 hover:text-[#e6c15c]"><PlusCircle size={20}/> Yeni Ekle</button>
          </div>
          <div className="space-y-4">
            {educations.map((edu, idx) => (
              <div key={idx} className="flex gap-4 items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
                <input type="text" placeholder="Yıl (1999-2003)" value={edu.year} onChange={(e) => updateEducation(idx, "year", e.target.value)} className="w-32 px-3 py-2 rounded-lg border outline-none" />
                <input type="text" placeholder="Bölüm (Psikoloji)" value={edu.title} onChange={(e) => updateEducation(idx, "title", e.target.value)} className="flex-1 px-3 py-2 rounded-lg border outline-none font-bold" />
                <input type="text" placeholder="Okul (İstanbul Üni.)" value={edu.school} onChange={(e) => updateEducation(idx, "school", e.target.value)} className="flex-1 px-3 py-2 rounded-lg border outline-none" />
                <button onClick={() => removeEducation(idx)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={20}/></button>
              </div>
            ))}
            {educations.length === 0 && <p className="text-gray-400 text-sm italic">Henüz eğitim eklenmedi.</p>}
          </div>
        </div>

        {/* 3. BÖLÜM: SERTİFİKALAR */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-[#031321]">3. Sertifikalar</h2>
            <label className="cursor-pointer bg-[#006699] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#004d73] transition-all flex items-center gap-2">
              <ImageIcon size={18} /> Yeni Sertifika Yükle
              <input type="file" accept="image/*" onChange={handleCertUpload} className="hidden" />
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {certificates.map((cert, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={cert.image_url} alt="Sertifika" className="w-full h-32 object-cover" />
                <button onClick={() => removeCertificate(idx)} className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={24}/></button>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BÖLÜM: DETAYLI BİLGİLER */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-[#031321] mb-6 border-b pb-4">4. Detaylı Bilgiler (En Alt Liste)</h2>
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            <ReactQuill theme="snow" value={detailedInfo} onChange={setDetailedInfo} className="h-96 mb-12" />
          </div>
        </div>

      </div>
    </div>
  );
}
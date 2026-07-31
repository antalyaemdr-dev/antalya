"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabase"; 
import { Save, Trash2, PlusCircle, Image as ImageIcon, X } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function HizmetAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [isSlugEdited, setIsSlugEdited] = useState(false); 
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  
  // SEO Meta State'leri
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (data) setServices(data);
  };

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase().trim()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
      .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .replace(/[^a-z0-9 -]/g, '') 
      .replace(/\s+/g, '-') 
      .replace(/-+/g, '-'); 
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isSlugEdited) setSlug(generateSlug(newTitle));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setIsSlugEdited(true); 
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileName = `service-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}.jpg`;
      const { error } = await supabase.storage.from('service-images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err: any) { alert("Hata: " + err.message); } finally { setUploadingImage(false); e.target.value = ''; }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const serviceData = { title, slug, content, image_url: imageUrl, meta_title: metaTitle, meta_description: metaDescription };
    
    if (currentId) {
      await supabase.from("services").update(serviceData).eq("id", currentId);
    } else {
      await supabase.from("services").insert([serviceData]);
    }
    alert("Hizmet Kaydedildi!"); resetForm(); fetchServices(); setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Emin misiniz?")) { await supabase.from("services").delete().eq("id", id); fetchServices(); }
  };

  const editService = (s: any) => {
    setCurrentId(s.id); setTitle(s.title); setSlug(s.slug); 
    setContent(s.content); setImageUrl(s.image_url); 
    setMetaTitle(s.meta_title || ""); setMetaDescription(s.meta_description || "");
    setIsSlugEdited(true); 
    setIsFormOpen(true);
  };

  const resetForm = () => { 
    setCurrentId(null); setTitle(""); setSlug("");  
    setContent(""); setImageUrl(""); 
    setMetaTitle(""); setMetaDescription(""); 
    setIsSlugEdited(false); setIsFormOpen(false); 
  };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Hizmet Yönetimi</h1>
        {!isFormOpen && <button onClick={() => setIsFormOpen(true)} className="bg-[#006699] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><PlusCircle size={20}/> Yeni Hizmet</button>}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl shadow-sm border">
          <div className="flex justify-between border-b pb-4 mb-6">
            <h2 className="text-xl font-bold">{currentId ? "Hizmeti Düzenle" : "Yeni Hizmet"}</h2>
            <button type="button" onClick={resetForm}><X size={24} className="text-red-500" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Hizmet Adı</label>
              <input required value={title} onChange={handleTitleChange} className="w-full border px-4 py-3 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">URL (Slug)</label>
              <input required value={slug} onChange={handleSlugChange} className="w-full border px-4 py-3 rounded-xl bg-gray-50" />
            </div>
          </div>

          {/* SEO Alanları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <div className="md:col-span-2"><h3 className="font-bold text-[#006699]">SEO Ayarları (Opsiyonel)</h3></div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Meta Başlık (Title)</label>
              <input placeholder="Opsiyonel" value={metaTitle} onChange={e=>setMetaTitle(e.target.value)} className="w-full border px-4 py-3 rounded-xl" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Meta Açıklama (Description)</label>
              <input placeholder="Kısa bir özet yazın" value={metaDescription} onChange={e=>setMetaDescription(e.target.value)} className="w-full border px-4 py-3 rounded-xl" />
            </div>
          </div>

          <div className="mb-6 flex gap-4 items-center">
            <label className="cursor-pointer bg-gray-50 border border-dashed p-4 rounded-xl">
              <ImageIcon className="inline mr-2"/> {uploadingImage ? "Yükleniyor..." : "Kapak Resmi Seç"}
              <input type="file" onChange={handleImageUpload} className="hidden" />
            </label>
            {imageUrl && <img src={imageUrl} className="h-16 rounded border" />}
          </div>

          <div className="mb-8 h-[400px]">
            <ReactQuill theme="snow" value={content} onChange={setContent} className="h-80" />
          </div>

          <button type="submit" disabled={isLoading} className="bg-[#031321] text-white px-8 py-4 rounded-xl font-bold w-full mt-8">{isLoading ? "Kaydediliyor..." : "Kaydet"}</button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.id} className="bg-white rounded-xl border p-4 shadow-sm">
              {s.image_url && <img src={s.image_url} className="w-full h-32 object-cover rounded-lg mb-3" />}
              <h3 className="font-bold text-lg mt-2 line-clamp-2">{s.title}</h3>
              <div className="flex gap-2 mt-4"><button onClick={()=>editService(s)} className="text-blue-600 text-sm font-bold">Düzenle</button><button onClick={()=>handleDelete(s.id)} className="text-red-500 text-sm font-bold">Sil</button></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
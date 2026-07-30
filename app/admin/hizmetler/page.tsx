"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabase";
import { Save, Trash2, PlusCircle, Image as ImageIcon, X } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function HizmetlerAdmin() {
  const [services, setServices] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0); // YENİ: Sıralama durumu

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    // YENİ: Artık tarihe göre değil, sıra numarasına göre (küçükten büyüğe) çekiyoruz
    const { data } = await supabase.from("services").select("*").order("sort_order", { ascending: true });
    if (data) setServices(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) return;
      
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const safeName = file.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
      const fileName = `hizmet-${Date.now()}-${safeName}.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('service-images').upload(fileName, file, { cacheControl: '3600', upsert: false });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from('service-images').getPublicUrl(fileName);
      setImageUrl(urlData.publicUrl);
    } catch (err: any) {
      alert("Resim yüklenemedi: " + err.message);
    } finally {
      setUploadingImage(false);
      e.target.value = ''; 
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // YENİ: sort_order veritabanına gönderiliyor
    const serviceData = { title, slug, short_description: shortDesc, content, image_url: imageUrl, sort_order: sortOrder };
    
    if (currentId) {
      await supabase.from("services").update(serviceData).eq("id", currentId);
    } else {
      await supabase.from("services").insert([serviceData]);
    }
    
    alert("İşlem başarılı!");
    resetForm();
    fetchServices();
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      await supabase.from("services").delete().eq("id", id);
      fetchServices();
    }
  };

  const editService = (srv: any) => {
    setCurrentId(srv.id); setTitle(srv.title || ""); setSlug(srv.slug || ""); 
    setShortDesc(srv.short_description || ""); setContent(srv.content || ""); 
    setImageUrl(srv.image_url || ""); setSortOrder(srv.sort_order || 0);
    setIsFormOpen(true);
  };

  const resetForm = () => {
    setCurrentId(null); setTitle(""); setSlug(""); setShortDesc(""); setContent(""); setImageUrl(""); setSortOrder(0); setIsFormOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Hizmetler Yönetimi</h1>
        </div>
        {!isFormOpen && (
          <button onClick={() => setIsFormOpen(true)} className="bg-[#006699] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#004d73]">
            <PlusCircle size={20}/> Yeni Hizmet Ekle
          </button>
        )}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <h2 className="text-xl font-bold text-[#031321]">{currentId ? "Hizmeti Düzenle" : "Yeni Hizmet"}</h2>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-red-500 bg-gray-50 p-2 rounded-full"><X size={24} /></button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block font-bold mb-2">Hizmet Adı</label>
              <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border px-4 py-3 rounded-xl outline-none" />
            </div>
            <div>
              <label className="block font-bold mb-2">URL (Slug)</label>
              <input required type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border px-4 py-3 rounded-xl outline-none" />
            </div>
            {/* YENİ: Sıralama Numarası Input'u */}
            <div>
              <label className="block font-bold mb-2 text-[#006699]">Sıra Numarası (1, 2, 3...)</label>
              <input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} className="w-full border-2 border-[#006699]/30 px-4 py-3 rounded-xl outline-none focus:border-[#006699]" />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block font-bold mb-2">Kapak Resmi</label>
            <div className="flex gap-4 items-center">
              <label className="cursor-pointer bg-gray-50 border border-dashed p-4 rounded-xl">
                <ImageIcon className="inline mr-2 text-gray-400"/> {uploadingImage ? "Yükleniyor..." : "Resim Seç"}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
              {imageUrl && <img src={imageUrl} className="h-16 rounded-xl border" />}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-bold mb-2">Kısa Açıklama</label>
            <textarea required rows={2} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-full border px-4 py-3 rounded-xl outline-none resize-none" />
          </div>

          <div className="mb-8 h-[300px]">
            <label className="block font-bold mb-2">Detaylı İçerik</label>
            <ReactQuill theme="snow" value={content} onChange={setContent} className="h-56" />
          </div>

          <button type="submit" disabled={isLoading} className="bg-[#031321] text-white px-8 py-4 rounded-xl font-bold mt-4 w-full md:w-auto">
            {isLoading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(srv => (
            <div key={srv.id} className="bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-sm relative">
              {/* YENİ: Sağ üst köşede sıra numarasını gösteren ufak rozet */}
              <div className="absolute top-4 right-4 bg-[#e6c15c] text-[#031321] font-extrabold w-8 h-8 flex items-center justify-center rounded-full text-sm shadow-md z-10">
                {srv.sort_order}
              </div>
              <div>
                {srv.image_url && <img src={srv.image_url} className="w-full h-32 object-cover rounded-xl mb-4" />}
                <h3 className="font-bold text-xl mb-2">{srv.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{srv.short_description}</p>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
                <button onClick={() => editService(srv)} className="text-[#006699] font-bold">Düzenle</button>
                <button onClick={() => handleDelete(srv.id)} className="text-red-500"><Trash2 size={18}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
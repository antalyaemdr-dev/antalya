"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Save, Trash2, Image as ImageIcon, ExternalLink } from "lucide-react";

export default function OnlineTestlerAdmin() {
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    const { data } = await supabase.from("online_tests").select("*").order("created_at", { ascending: false });
    if (data) setTests(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `test-${Math.random()}.${fileExt}`;
      const { error } = await supabase.storage.from('service-images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err: any) {
      alert("Hata: " + err.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.from("online_tests").insert([{ title, description, image_url: imageUrl, external_url: externalUrl }]);
    if (!error) {
      alert("Test eklendi!");
      setTitle(""); setDescription(""); setExternalUrl(""); setImageUrl("");
      fetchTests();
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu testi silmek istediğinize emin misiniz?")) {
      await supabase.from("online_tests").delete().eq("id", id);
      fetchTests();
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-24">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Online Testler Yönetimi</h1>

      {/* Yeni Test Ekleme Formu */}
      <form onSubmit={handleAddTest} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-12">
        <h2 className="text-xl font-bold mb-6 border-b pb-4">Yeni Test Ekle</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-2">Test Adı</label>
            <input required type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className="w-full border p-3 rounded-lg" />
            
            <label className="block font-bold mb-2 mt-4">Dış Bağlantı (Testin Çözüleceği URL)</label>
            <input required type="url" value={externalUrl} onChange={(e)=>setExternalUrl(e.target.value)} placeholder="https://..." className="w-full border p-3 rounded-lg" />
          </div>
          <div>
            <label className="block font-bold mb-2">Kısa Açıklama (İsteğe Bağlı)</label>
            <textarea value={description} onChange={(e)=>setDescription(e.target.value)} className="w-full border p-3 rounded-lg resize-none" rows={3} />
          </div>
          <div className="md:col-span-2">
            <label className="block font-bold mb-2">Kapak Resmi</label>
            <div className="flex items-center gap-4">
              <label className="cursor-pointer bg-gray-50 border border-dashed border-gray-300 p-4 rounded-lg hover:bg-gray-100">
                <ImageIcon className="inline mr-2" size={20}/> {uploadingImage ? "Yükleniyor..." : "Resim Seç"}
                <input type="file" onChange={handleImageUpload} className="hidden" />
              </label>
              {imageUrl && <img src={imageUrl} alt="Önizleme" className="h-16 rounded shadow" />}
            </div>
          </div>
        </div>
        <button disabled={isLoading} className="mt-6 bg-[#006699] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#004d73]">
          {isLoading ? "Ekleniyor..." : "Testi Ekle"}
        </button>
      </form>

      {/* Eklenen Testler Listesi */}
      <h2 className="text-xl font-bold mb-6">Mevcut Testler</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tests.map(test => (
          <div key={test.id} className="bg-white rounded-xl overflow-hidden border shadow-sm relative group">
            <img src={test.image_url} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">{test.title}</h3>
              <a href={test.external_url} target="_blank" className="text-blue-500 text-sm mt-2 inline-flex items-center gap-1"><ExternalLink size={14}/> Test Linki</a>
            </div>
            <button onClick={() => handleDelete(test.id)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
          </div>
        ))}
      </div>
    </div>
  );
}
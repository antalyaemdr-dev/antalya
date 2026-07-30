"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Save, Trash2, PlusCircle, Image as ImageIcon, X } from "lucide-react";

export default function OnerilerAdmin() {
  const [items, setItems] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Kitap");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    const { data } = await supabase.from("recommendations").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileName = `oneri-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}.jpg`;
      await supabase.storage.from('service-images').upload(fileName, file);
      const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err) { alert("Hata"); } finally { setUploadingImage(false); e.target.value=''; }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const itemData = { title, type, description, image_url: imageUrl };
    if (currentId) await supabase.from("recommendations").update(itemData).eq("id", currentId);
    else await supabase.from("recommendations").insert([itemData]);
    resetForm(); fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Emin misiniz?")) { await supabase.from("recommendations").delete().eq("id", id); fetchItems(); }
  };

  const editItem = (item: any) => {
    setCurrentId(item.id); setTitle(item.title); setType(item.type);
    setDescription(item.description); setImageUrl(item.image_url); setIsFormOpen(true);
  };

  const resetForm = () => { setCurrentId(null); setTitle(""); setType("Kitap"); setDescription(""); setImageUrl(""); setIsFormOpen(false); };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Öneriler Yönetimi</h1>
        {!isFormOpen && <button onClick={() => setIsFormOpen(true)} className="bg-[#006699] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><PlusCircle size={20}/> Yeni Ekle</button>}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl shadow-sm border">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <input required placeholder="Eser/İçerik Adı" value={title} onChange={e=>setTitle(e.target.value)} className="border px-4 py-3 rounded-xl" />
            <select value={type} onChange={e=>setType(e.target.value)} className="border px-4 py-3 rounded-xl">
              <option value="Kitap">Kitap</option><option value="Film">Film</option><option value="Belgesel">Belgesel</option><option value="Podcast">Podcast</option>
            </select>
          </div>
          <div className="mb-6 flex gap-4 items-center">
            <label className="cursor-pointer bg-gray-50 border border-dashed p-4 rounded-xl">
              <ImageIcon className="inline mr-2"/> {uploadingImage ? "Yükleniyor..." : "Kapak Resmi"}
              <input type="file" onChange={handleImageUpload} className="hidden" />
            </label>
            {imageUrl && <img src={imageUrl} className="h-16 rounded border" />}
          </div>
          <textarea required rows={4} placeholder="Kısa İnceleme / Açıklama" value={description} onChange={e=>setDescription(e.target.value)} className="w-full border px-4 py-3 rounded-xl mb-6 resize-none" />
          <button type="submit" className="bg-[#031321] text-white px-8 py-4 rounded-xl font-bold w-full">Kaydet</button>
        </form>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(i => (
            <div key={i.id} className="bg-white rounded-xl border p-4">
              {i.image_url && <img src={i.image_url} className="w-full h-48 object-cover rounded-lg mb-3" />}
              <span className="text-xs bg-[#e6c15c] px-2 py-1 rounded font-bold">{i.type}</span>
              <h3 className="font-bold text-lg mt-2">{i.title}</h3>
              <div className="flex gap-2 mt-4"><button onClick={()=>editItem(i)} className="text-blue-600 text-sm font-bold">Düzenle</button><button onClick={()=>handleDelete(i.id)} className="text-red-500 text-sm font-bold">Sil</button></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
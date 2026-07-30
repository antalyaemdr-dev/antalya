"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabase";
import { Save, Trash2, PlusCircle, Image as ImageIcon, X } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function BlogAdmin() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [currentId, setCurrentId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("published");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => { fetchBlogs(); }, []);

  const fetchBlogs = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setBlogs(data);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileName = `blog-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9]/g, '')}.jpg`;
      const { error } = await supabase.storage.from('service-images').upload(fileName, file);
      if (error) throw error;
      const { data } = supabase.storage.from('service-images').getPublicUrl(fileName);
      setImageUrl(data.publicUrl);
    } catch (err: any) { alert("Hata: " + err.message); } finally { setUploadingImage(false); e.target.value = ''; }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const blogData = { title, slug, status, category, content, image_url: imageUrl };
    if (currentId) {
      await supabase.from("blogs").update(blogData).eq("id", currentId);
    } else {
      await supabase.from("blogs").insert([blogData]);
    }
    alert("Kaydedildi!"); resetForm(); fetchBlogs(); setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Emin misiniz?")) { await supabase.from("blogs").delete().eq("id", id); fetchBlogs(); }
  };

  const editBlog = (b: any) => {
    setCurrentId(b.id); setTitle(b.title); setSlug(b.slug); setStatus(b.status);
    setCategory(b.category); setContent(b.content); setImageUrl(b.image_url); setIsFormOpen(true);
  };

  const resetForm = () => { setCurrentId(null); setTitle(""); setSlug(""); setStatus("published"); setCategory(""); setContent(""); setImageUrl(""); setIsFormOpen(false); };

  return (
    <div className="max-w-6xl mx-auto pb-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold">Blog Yönetimi</h1>
        {!isFormOpen && <button onClick={() => setIsFormOpen(true)} className="bg-[#006699] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"><PlusCircle size={20}/> Yeni Yazı</button>}
      </div>

      {isFormOpen ? (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-3xl shadow-sm border">
          <div className="flex justify-between border-b pb-4 mb-6">
            <h2 className="text-xl font-bold">{currentId ? "Yazıyı Düzenle" : "Yeni Yazı"}</h2>
            <button type="button" onClick={resetForm}><X size={24} className="text-red-500" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input required placeholder="Başlık" value={title} onChange={e=>setTitle(e.target.value)} className="border px-4 py-3 rounded-xl" />
            <input required placeholder="URL (Slug)" value={slug} onChange={e=>setSlug(e.target.value)} className="border px-4 py-3 rounded-xl" />
            <input required placeholder="Kategori (Örn: Psikoloji)" value={category} onChange={e=>setCategory(e.target.value)} className="border px-4 py-3 rounded-xl" />
            <select value={status} onChange={e=>setStatus(e.target.value)} className="border px-4 py-3 rounded-xl">
              <option value="published">Yayında</option>
              <option value="draft">Taslak (Sadece siz görürsünüz)</option>
            </select>
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
          {blogs.map(b => (
            <div key={b.id} className={`bg-white rounded-xl border p-4 shadow-sm ${b.status === 'draft' ? 'opacity-60' : ''}`}>
              {b.image_url && <img src={b.image_url} className="w-full h-32 object-cover rounded-lg mb-3" />}
              <span className="text-xs bg-gray-100 px-2 py-1 rounded font-bold">{b.category}</span>
              <span className={`text-xs ml-2 px-2 py-1 rounded font-bold ${b.status === 'published' ? 'text-green-600 bg-green-50' : 'text-orange-600 bg-orange-50'}`}>{b.status === 'published' ? 'Yayında' : 'Taslak'}</span>
              <h3 className="font-bold text-lg mt-2 line-clamp-2">{b.title}</h3>
              <div className="flex gap-2 mt-4"><button onClick={()=>editBlog(b)} className="text-blue-600 text-sm font-bold">Düzenle</button><button onClick={()=>handleDelete(b.id)} className="text-red-500 text-sm font-bold">Sil</button></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
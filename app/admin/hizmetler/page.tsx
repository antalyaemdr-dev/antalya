"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "../../../lib/supabase";
import { PlusCircle, Trash2, Image as ImageIcon, Save } from "lucide-react";
import "react-quill-new/dist/quill.snow.css"; // Editörün tasarımı

// Next.js'te Quill editörünü Server Side Rendering (SSR) hatası vermemesi için dinamik yüklüyoruz
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function HizmetYonetimi() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    if (data) setServices(data);
  };

  const generateSlug = (text: string) => {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  };

  // RESİM YÜKLEME İŞLEMİ (Supabase Storage)
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploadingImage(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error("Lütfen bir resim seçin.");
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      // 'service-images' bucket'ına yükle
      const { error: uploadError, data } = await supabase.storage
        .from('service-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Yüklenen resmin Public URL'ini al
      const { data: { publicUrl } } = supabase.storage
        .from('service-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const slug = generateSlug(title);

    const { error } = await supabase.from("services").insert([
      {
        title,
        slug,
        short_description: shortDesc,
        content,
        image_url: imageUrl,
        meta_title: metaTitle,
        meta_description: metaDesc,
        is_active: true
      }
    ]);

    if (!error) {
      // Formu Temizle
      setTitle(""); setShortDesc(""); setContent(""); 
      setImageUrl(""); setMetaTitle(""); setMetaDesc("");
      fetchServices(); 
    } else {
      alert("Eklenirken hata oluştu: " + error.message);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
      await supabase.from("services").delete().eq("id", id);
      fetchServices();
    }
  };

  // Editör modülleri (Hangi butonlar görünsün)
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ],
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Gelişmiş Hizmet Yönetimi</h1>
        <p className="text-gray-500 mt-2">Hizmet içeriklerinizi, görsellerini ve SEO ayarlarını buradan yönetin.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* SOL TARAF: FORM (2 Kolon Genişliğinde) */}
        <div className="xl:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <form onSubmit={handleAddService} className="space-y-6">
              
              {/* Üst Kısım: Başlık ve Resim */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Hizmet Başlığı *</label>
                  <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Kapak Resmi</label>
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer flex items-center justify-center bg-gray-50 border border-dashed border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-100 transition-all flex-grow">
                      <ImageIcon className="w-5 h-5 mr-2 text-gray-500" />
                      <span className="text-sm font-medium text-gray-600">
                        {uploadingImage ? 'Yükleniyor...' : 'Görsel Seç ve Yükle'}
                      </span>
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage} />
                    </label>
                    {imageUrl && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                        <img src={imageUrl} alt="Önizleme" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Kısa Açıklama */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Kısa Açıklama (Özet) *</label>
                <textarea required rows={2} value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean outline-none resize-none" placeholder="Ana sayfa kartlarında görünecek yazı..." />
              </div>

              {/* Detaylı İçerik (React Quill) */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Detaylı İçerik *</label>
                <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                  <ReactQuill 
                    theme="snow" 
                    value={content} 
                    onChange={setContent} 
                    modules={quillModules}
                    className="h-64 mb-12" // Toolbar ve alan yüksekliği ayarı
                  />
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* SEO Alanı */}
              <div className="bg-sand-light/50 p-6 rounded-xl border border-sand-dark/20">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">SEO Ayarları</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title (SEO Başlığı)</label>
                    <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-mediterranean outline-none" placeholder="Örn: Antalya Aile Terapisi | Meryem Gül Eren" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description (SEO Açıklaması)</label>
                    <textarea rows={2} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-mediterranean outline-none resize-none" placeholder="Google arama sonuçlarında görünecek açıklama metni..." />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="w-full bg-mediterranean text-white py-4 rounded-xl font-bold hover:bg-mediterranean-dark transition-all flex items-center justify-center gap-2 text-lg shadow-lg">
                <Save size={20} /> {isLoading ? "Kaydediliyor..." : "Hizmeti Yayınla"}
              </button>

            </form>
          </div>
        </div>

        {/* SAĞ TARAF: LİSTE (1 Kolon Genişliğinde) */}
        <div className="xl:col-span-1 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Yayındaki Hizmetler</h2>
          <div className="max-h-[800px] overflow-y-auto pr-2 space-y-4">
            {services.length === 0 ? (
              <div className="bg-gray-50 p-6 rounded-2xl text-center text-gray-500 border border-dashed border-gray-300">
                Hiç hizmet bulunamadı.
              </div>
            ) : (
              services.map((service) => (
                <div key={service.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-3 group hover:border-mediterranean/40 transition-colors">
                  {service.image_url && (
                    <img src={service.image_url} alt={service.title} className="w-full h-32 object-cover rounded-xl" />
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{service.title}</h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{service.short_description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-50">
                    <span className="text-xs font-mono bg-gray-100 text-gray-600 px-2 py-1 rounded">/{service.slug}</span>
                    <button onClick={() => handleDelete(service.id)} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
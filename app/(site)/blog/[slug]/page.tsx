"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";

export default function BlogDetay() {
  const params = useParams();
  const slug = params?.slug as string;
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchBlog = async () => {
      const { data } = await supabase.from("blogs").select("*").eq("slug", slug).single();
      if (data) setBlog(data);
    };
    fetchBlog();
  }, [slug]);

  // Kopyala-Yapıştır kalıntılarını (yapışık boşlukları) temizleyen fonksiyon
  const getCleanContent = (html: string) => {
    if (!html) return "";
    return html.replace(/&nbsp;/g, " "); 
  };

  if (!blog) return <div className="min-h-screen flex items-center justify-center text-[#006699] font-bold">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      
      {/* 
        GİZLİ KOPYALA-YAPIŞTIR STİLLERİNİ EZEN KESİN ZIRH 
        Editörden gelen arka plan renklerini ve hatalı kelime bölmelerini temizler.
      */}
      <style dangerouslySetInnerHTML={{__html: `
        .clean-text * {
          background-color: transparent !important;
          background: transparent !important;
          white-space: normal !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
          letter-spacing: normal !important;
        }
      `}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigasyon İzi (Breadcrumb) */}
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-[#006699]">Ana Sayfa</Link><ChevronRight size={14} />
          <Link href="/blog" className="hover:text-[#006699]">Blog</Link><ChevronRight size={14} />
          <span className="text-[#006699]">{blog.title}</span>
        </div>

        {/* Blog Başlığı ve Detayları */}
        <div className="mb-8">
          <span className="bg-[#e6c15c]/20 text-[#031321] font-bold px-3 py-1 rounded-full text-sm">{blog.category}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#031321] mt-4 mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 font-medium text-sm">
            <span>{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
            <span className="flex items-center gap-1"><Clock size={16}/> {Math.ceil((blog.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length) / 200)} dk okuma</span>
          </div>
        </div>

        {/* Kapak Resmi */}
        {blog.image_url && (
          <img src={blog.image_url} alt={blog.title} className="w-full aspect-video object-cover rounded-3xl mb-12 shadow-lg" />
        )}

        {/* 
          Zengin Metin İçerik Alanı 
          clean-text class'ı ve getCleanContent fonksiyonu ile tertemiz bir çıktı sağlar.
        */}
        <div 
          className="clean-text prose prose-lg max-w-none w-full prose-headings:text-[#031321] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-loose prose-a:text-[#006699] prose-strong:text-[#031321] prose-img:rounded-xl" 
          dangerouslySetInnerHTML={{ __html: getCleanContent(blog.content) }} 
        />
        
      </div>
    </div>
  );
}
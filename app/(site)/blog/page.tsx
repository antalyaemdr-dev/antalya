"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import { ArrowRight, Clock } from "lucide-react";

export default function BlogListesi() {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from("blogs").select("*").eq("status", "published").order("created_at", { ascending: false });
      if (data) setBlogs(data);
    };
    fetchBlogs();
  }, []);

  const calculateReadTime = (htmlContent: string) => {
    if (!htmlContent) return 1;
    const text = htmlContent.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ');
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / 200); 
  };

  // HTML etiketlerini ve bozuk karakterleri temizleyen özet fonksiyonu
  const generateExcerpt = (htmlContent: string) => {
    if (!htmlContent) return "";
    const text = htmlContent
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&');
      
    return text.substring(0, 120) + "...";
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#e6c15c] font-bold tracking-widest uppercase text-sm mb-3 block">Güncel Makaleler</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#031321]">Uzman Kaleminden</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full group">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-20 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-[#031321]">{blog.category}</div>
                {blog.image_url && <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />}
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-gray-400 text-sm mb-3">
                  <span>{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
                  <span className="flex items-center gap-1"><Clock size={14}/> {calculateReadTime(blog.content)} dk okuma</span>
                </div>
                <h3 className="text-xl font-bold text-[#031321] mb-4 group-hover:text-[#006699] transition-colors">{blog.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-6 flex-grow">{generateExcerpt(blog.content)}</p>
                <Link href={`/blog/${blog.slug}`} className="inline-flex items-center text-sm font-bold bg-[#031321] text-white px-6 py-3 rounded-lg hover:bg-[#006699] transition-colors self-start mt-auto">
                  Detaylı Gör <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
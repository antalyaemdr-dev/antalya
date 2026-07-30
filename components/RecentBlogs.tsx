"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { supabase } from "../lib/supabase"; 

export default function RecentBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("status", "published") 
        .order("created_at", { ascending: false }) 
        .limit(3); 
        
      if (data) setBlogs(data);
      setIsLoading(false);
    };
    
    fetchRecentBlogs();
  }, []);

  // HTML etiketlerini ve bozuk karakterleri temizleyen özet fonksiyonu
  const generateExcerpt = (htmlContent: string) => {
    if (!htmlContent) return "";
    // HTML taglarını siler ve &nbsp; gibi karakterleri gerçek boşluğa çevirir
    const text = htmlContent
      .replace(/<[^>]*>?/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&');
      
    return text.substring(0, 120) + "..."; 
  };

  if (isLoading) return null; 
  if (blogs.length === 0) return null; 

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block">
              Uzman Kaleminden
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#031321]">
              Güncel Makaleler
            </h2>
          </div>
          <Link href="/blog" className="text-[#006699] font-bold hover:text-[#031321] transition-colors flex items-center group">
            Tüm Yazıları Gör <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block h-full">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#031321]">
                    {blog.category || "Genel"}
                  </div>
                  {blog.image_url ? (
                    <img 
                      src={blog.image_url} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-gray-400 text-sm mb-3 block">
                    {new Date(blog.created_at).toLocaleDateString('tr-TR')}
                  </span>
                  <h3 className="text-xl font-bold text-[#031321] mb-4 group-hover:text-[#006699] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {generateExcerpt(blog.content)}
                  </p>
                  <span className="text-sm font-bold text-[#e6c15c] uppercase tracking-wider group-hover:text-[#006699] transition-colors flex items-center mt-auto">
                    Devamını Oku <ArrowRight size={16} className="ml-2" />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
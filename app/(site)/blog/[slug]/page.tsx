import { supabase } from "../../../../lib/supabase"; // Kendi yoluna göre ayarla
import Link from "next/link";
import { ChevronRight, Clock } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// GÜNCELLEME: params artık bir Promise olarak tanımlanıyor (Next.js 15+ uyumluluğu)
interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO BİLGİLERİNİ ÇEKME
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // GÜNCELLEME: params'ı await ile çözüyoruz
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // 1. İlgili blog'un kendi verilerini çek
  const { data: blog } = await supabase
    .from("blogs")
    .select("title, meta_title, meta_description")
    .eq("slug", slug)
    .single();

  // 2. Site ayarlarından varsayılan SEO verilerini çek
  const { data: settings } = await supabase
    .from("site_settings")
    .select("meta_title, meta_description")
    .limit(1)
    .single();

  if (!blog) return { title: 'Yazı Bulunamadı' };

  // Öncelik: Blog'un özel metası -> Yoksa blog başlığı -> Yoksa sitenin genel metası -> Hiçbiri yoksa sabit metin
  const finalTitle = blog.meta_title || blog.title || settings?.meta_title || "Antalya EMDR";
  const finalDescription = blog.meta_description || settings?.meta_description || "Antalya EMDR ve Psikolojik Danışmanlık";

  return {
    title: finalTitle,
    description: finalDescription,
  };
}

// SAYFANIN KENDİSİ (Server Component)
export default async function BlogDetay({ params }: PageProps) {
  // GÜNCELLEME: params'ı await ile çözüyoruz
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!blog) notFound();

  const getCleanContent = (html: string) => {
    if (!html) return "";
    return html.replace(/&nbsp;/g, " "); 
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      
      {/* GİZLİ KOPYALA-YAPIŞTIR STİLLERİNİ EZEN KESİN ZIRH */}
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
        
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-[#006699]">Ana Sayfa</Link><ChevronRight size={14} />
          <Link href="/blog" className="hover:text-[#006699]">Blog</Link><ChevronRight size={14} />
          <span className="text-[#006699]">{blog.title}</span>
        </div>

        <div className="mb-8">
          <span className="bg-[#e6c15c]/20 text-[#031321] font-bold px-3 py-1 rounded-full text-sm">{blog.category}</span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#031321] mt-4 mb-4">{blog.title}</h1>
          <div className="flex items-center gap-4 text-gray-500 font-medium text-sm">
            <span>{new Date(blog.created_at).toLocaleDateString('tr-TR')}</span>
            <span className="flex items-center gap-1"><Clock size={16}/> {Math.ceil((blog.content.replace(/<[^>]*>?/gm, '').split(/\s+/).length) / 200)} dk okuma</span>
          </div>
        </div>

        {blog.image_url && (
          <img src={blog.image_url} alt={blog.title} className="w-full aspect-video object-cover rounded-3xl mb-12 shadow-lg" />
        )}

        <div 
          className="clean-text prose prose-lg max-w-none w-full prose-headings:text-[#031321] prose-headings:font-bold prose-p:text-gray-600 prose-p:leading-loose prose-a:text-[#006699] prose-strong:text-[#031321] prose-img:rounded-xl" 
          dangerouslySetInnerHTML={{ __html: getCleanContent(blog.content) }} 
        />
        
      </div>
    </div>
  );
}
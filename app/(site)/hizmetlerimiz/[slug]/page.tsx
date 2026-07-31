import { supabase } from "../../../../lib/supabase"; // Kendi yoluna göre ayarla
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Next.js 15+ uyumluluğu için params Promise olarak tanımlandı
interface PageProps {
  params: Promise<{ slug: string }>;
}

// SEO BİLGİLERİNİ ÇEKME
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: service } = await supabase
    .from("services")
    .select("title, meta_title, meta_description")
    .eq("slug", slug)
    .single();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("meta_title, meta_description")
    .limit(1)
    .single();

  if (!service) return { title: 'Hizmet Bulunamadı' };

  const finalTitle = service.meta_title || service.title || settings?.meta_title || "Antalya EMDR";
  const finalDescription = service.meta_description || settings?.meta_description || "Antalya EMDR ve Psikolojik Danışmanlık Hizmetleri";

  return {
    title: finalTitle,
    description: finalDescription,
  };
}

// SAYFANIN KENDİSİ
export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data: service } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!service) notFound();

  const getCleanContent = (html: string) => {
    if (!html) return "";
    return html.replace(/&nbsp;/g, " "); 
  };

  return (
    <main className="min-h-screen bg-white py-24 md:py-32">
      
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
        
        {/* Navigasyon İzi */}
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-8">
          <Link href="/" className="hover:text-[#006699]">Ana Sayfa</Link><ChevronRight size={14} />
          <Link href="/hizmetlerimiz" className="hover:text-[#006699]">Hizmetlerimiz</Link><ChevronRight size={14} />
          <span className="text-[#006699]">{service.title}</span>
        </div>

        <span className="text-xs uppercase tracking-[0.3em] text-[#006699] font-bold block mb-3">
          Hizmet Detayı
        </span>

        <h1 className="text-3xl md:text-5xl font-serif font-light text-[#031321] tracking-tight mb-8 leading-tight">
          {service.title}
        </h1>

        {service.image_url && (
          <div className="relative w-full aspect-[16/9] mb-12 overflow-hidden rounded-3xl bg-gray-100 shadow-sm">
            <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div 
          className="clean-text prose prose-lg max-w-none text-gray-700 font-light leading-relaxed space-y-6 prose-headings:text-[#031321] prose-headings:font-bold prose-a:text-[#006699] prose-img:rounded-xl"
          dangerouslySetInnerHTML={{ __html: getCleanContent(service.content) }}
        />

        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/hizmetlerimiz" className="text-xs uppercase tracking-[0.2em] font-bold text-[#006699] hover:text-[#004d73] transition-colors">
            &larr; Tüm Hizmetlerimiz
          </Link>
          <Link href="/iletisim" className="w-full sm:w-auto text-center bg-[#006699] hover:bg-[#004d73] text-white px-8 py-3.5 rounded-xl font-bold transition-colors shadow-lg">
            Hemen Randevu Al
          </Link>
        </div>

      </div>
    </main>
  );
}
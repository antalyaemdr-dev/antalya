import { Metadata } from "next";
// GÜNCELLEME: Dosya yolu iki kademe geri çıkacak şekilde düzeltildi
import { supabase } from "../../lib/supabase"; 
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import AboutSummary from "../../components/AboutSummary";
import CallToAction from "../../components/CallToAction";
import RecentBlogs from "../../components/RecentBlogs";
import ContactPreview from "../../components/ContactPreview";

// 1. DİNAMİK SEO & OPEN GRAPH
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await supabase
    .from("site_settings")
    .select("meta_title, meta_description")
    .limit(1)
    .single();

  const title = settings?.meta_title || "Antalya EMDR ve Psikolojik Danışmanlık";
  const description = settings?.meta_description || "Antalya'da profesyonel EMDR terapisi ve psikolojik danışmanlık hizmetleri.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://www.antalyaemdr.com.tr",
      siteName: "Antalya EMDR",
      locale: "tr_TR",
      type: "website",
    },
  };
}

export default async function Home() {
  // Site ayarlarını Schema için çekiyoruz
  const { data: settings } = await supabase.from("site_settings").select("*").limit(1).single();

  // 2. SCHEMA.ORG YAPISAL VERİSİ (LocalBusiness / MedicalClinic)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Antalya EMDR ve Psikolojik Danışmanlık",
    "url": "https://www.antalyaemdr.com.tr",
    "telephone": settings?.phone || "+90",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings?.address || "Antalya",
      "addressLocality": "Antalya",
      "addressCountry": "TR"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Schema.org JSON-LD Scripti */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <Hero />
      <Services /> 
      <AboutSummary />
      <CallToAction />
      <RecentBlogs />
      <ContactPreview />
    </div>
  );
}
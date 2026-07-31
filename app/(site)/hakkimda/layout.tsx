import { Metadata } from "next";
import { supabase } from "../../../lib/supabase"; // Kendi yoluna göre ayarla

// SADECE SEO (SERVER SIDE)
export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await supabase.from("about_page").select("meta_title, meta_description").eq("id", 1).single();
  const { data: settings } = await supabase.from("site_settings").select("meta_title, meta_description").limit(1).single();

  // Öncelik: Özel meta -> Yoksa site genel ayarı -> O da yoksa sabit metin
  const title = page?.meta_title || settings?.meta_title || "Hakkımda | Antalya EMDR";
  const description = page?.meta_description || settings?.meta_description || "Uzman Psikolojik Danışman Meryem Hanım hakkında detaylı bilgi.";

  return { title, description };
}

export default function HakkimdaLayout({ children }: { children: React.ReactNode }) {
  // children, senin page.tsx dosyanı temsil eder
  return <>{children}</>;
}
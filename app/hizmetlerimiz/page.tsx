import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabase"; // Supabase bağlantımızı çağırıyoruz

// Next.js'in bu sayfayı her ziyaret edildiğinde yeniden oluşturmasını (dinamik olmasını) sağlar
export const revalidate = 0; 

export default async function Hizmetlerimiz() {
  // Supabase'den aktif olan hizmetleri çekiyoruz
  const { data: services, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: true });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. ÜST BAŞLIK ALANI (HERO) */}
      <section className="bg-sand-light/50 py-16 md:py-24 border-b border-sand-dark/20">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-xs font-bold tracking-widest text-mediterranean uppercase mb-4">UZMANLIK ALANLARI</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Hizmetlerimiz</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Meryem Gül Eren yönetiminde, bilimsel temellere dayanan profesyonel psikolojik destek ve terapi süreçleri.
          </p>
        </div>
      </section>

      {/* 2. DİNAMİK HİZMETLER LİSTESİ */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          
          {error ? (
            <div className="text-center text-red-500 font-bold bg-red-50 p-6 rounded-xl">
              Veriler çekilirken bir hata oluştu: {error.message}
            </div>
          ) : !services || services.length === 0 ? (
            <div className="text-center text-gray-500 font-medium bg-sand-light p-12 rounded-2xl border border-dashed border-sand-dark/40">
              Henüz bir hizmet eklenmemiş. Admin panelinden veya Supabase üzerinden yeni hizmet ekleyebilirsiniz.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Supabase'den gelen verileri map ile ekrana basıyoruz */}
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                  
                  {/* Dekoratif Arka Plan (Hover olunca büyür) */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sand-light rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-[2]"></div>
                  
                  {/* İkon */}
                  <div className="w-16 h-16 mb-6 bg-mediterranean/10 rounded-2xl flex items-center justify-center text-mediterranean">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  
                  {/* İçerik */}
                  <h3 className="font-bold text-gray-900 mb-4 text-2xl group-hover:text-mediterranean transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-base text-gray-600 font-medium leading-relaxed flex-grow mb-8">
                    {service.short_description}
                  </p>
                  
                  {/* Detay Butonu (İleride slug ile detay sayfasına gidecek) */}
                  <Link href={`/hizmetlerimiz/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-mediterranean hover:text-mediterranean-dark transition-colors mt-auto">
                    Detaylı İncele <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          )}
          
        </div>
      </section>

      {/* 3. ORTAK CTA (HAREKETE GEÇİRİCİ MESAJ) */}
      <section className="bg-mediterranean py-20 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">Doğru Desteği Almak İçin Beklemeyin</h2>
          <p className="text-sand-light/90 text-lg mb-8 max-w-2xl mx-auto">
            Hangi hizmetin sizin için uygun olduğundan emin değilseniz, ön görüşme için bizimle iletişime geçebilirsiniz.
          </p>
          <Link href="/randevu" className="inline-block bg-sand text-mediterranean-dark font-bold text-lg px-10 py-4 rounded-xl hover:bg-white hover:scale-105 transition-all shadow-lg">
            Randevu Alın
          </Link>
        </div>
      </section>

    </div>
  );
}
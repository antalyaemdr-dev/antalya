import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Award, Sparkles } from "lucide-react";

export default function Hakkimda() {
  // NOT: Bu veriler daha sonra Supabase'den (pages tablosundan) gelecek.
  // Şimdilik UI (Önyüz) tasarımı için statik olarak tanımladık.
  const page = {
    title: "Merhaba, Ben Meryem",
    short_description: "Bireysel danışmanlık, çift ve aile terapisi ile EMDR alanlarında uzmanlaşmış bir psikolojik danışmanım. Amacım, danışanlarımın içsel potansiyellerini keşfetmelerine ve geçmişin yüklerinden arınmalarına rehberlik etmektir.",
    content_title: "Hikayem & Yaklaşımım",
    content: "<p>Meslek hayatım boyunca her bireyin biricik olduğuna inandım. Terapi odası, yargılanmadan anlaşıldığınız, güvenli bir limandır.</p><p>EMDR terapisi ile travmatik anıların yeniden işlenmesini sağlarken, aile danışmanlığı ile ilişkilerdeki düğümleri çözmeye odaklanıyorum.</p>",
    image_url: "/images/meryem-gul-eren.webp" // Gelecekte eklenecek görsel yolu
  };

  const egitimler = [
    { yil: "2018", bolum: "Psikolojik Danışmanlık ve Rehberlik", kurum: "Üniversite Adı" },
    { yil: "2021", bolum: "Klinik Psikoloji Yüksek Lisans", kurum: "Üniversite Adı" }
  ];

  const calismaAlanlari = [
    { title: "EMDR Terapisi", description: "Travma ve olumsuz anıların yeniden işlenmesi.", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Bireysel Danışmanlık", description: "Kişisel farkındalık ve yaşam zorluklarıyla başa çıkma.", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Aile Danışmanlığı", description: "Aile içi iletişim sorunları ve kriz yönetimi.", icon: <Sparkles className="w-6 h-6" /> },
    { title: "Çift Danışmanlığı", description: "İlişki problemleri ve bağlanma sorunları.", icon: <Sparkles className="w-6 h-6" /> }
  ];

  return (
    <div className="overflow-x-hidden bg-white"> 

      {/* 1. HERO - KARŞILAMA ALANI */}
      <section className="relative pt-16 pb-16 lg:pt-24 lg:pb-24 bg-sand-light/50 border-b border-sand-dark/20">
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            
            {/* Metin Alanı */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xs font-bold tracking-widest text-mediterranean uppercase mb-4">HAKKIMDA</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8">
                {page.title}
              </h1>
              
              <div 
                className="w-full text-lg text-gray-600 leading-relaxed max-w-3xl font-medium"
                dangerouslySetInnerHTML={{ __html: page.short_description }}
              />
            </div>

            {/* Görsel Alanı */}
            <div className="flex-shrink-0 relative w-64 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-sand">
              <div className="absolute inset-0 flex items-center justify-center text-mediterranean-dark/50 p-4 text-center text-sm font-bold">
                Fotoğraf (232x320)
              </div>
              {/* Gerçek görsel geldiğinde bu yorum satırını açabilirsin
              <Image 
                src={page.image_url} 
                alt="Meryem Gül Eren" 
                fill
                className="object-cover"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* 2. EĞİTİM VE SERTİFİKALAR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Eğitimler */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center gap-3">
                <GraduationCap className="text-mediterranean w-8 h-8" />
                Eğitim Geçmişim
              </h2>
              <div className="space-y-6">
                {egitimler.map((e, i) => (
                  <div key={i} className="flex gap-5 items-start p-4 rounded-xl hover:bg-sand-light/50 transition-colors border border-transparent hover:border-sand-dark/20">
                    <div className="flex-shrink-0 px-4 py-2 mt-1 min-w-[90px] text-center rounded-lg bg-mediterranean text-white font-bold text-sm shadow-sm">
                      {e.yil}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{e.bolum}</h3>
                      <p className="text-gray-500 font-medium">{e.kurum}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sertifikalar */}
            <div className="lg:col-span-7 min-w-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-10 flex items-center gap-3">
                <Award className="text-mediterranean w-8 h-8" />
                Sertifikalar ve Başarılar
              </h2>
              {/* Geçici Sertifika Grid Alanı */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="aspect-square bg-sand-light rounded-xl border-2 border-dashed border-sand-dark/40 flex items-center justify-center text-gray-400 text-sm font-semibold">
                    Sertifika {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. DETAYLI BİLGİLER / HAKKIMDA METNİ */}
      <section className="py-24 bg-sand-light/30 border-t border-sand-dark/20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {page.content_title}
            </h2>
            <div className="w-24 h-1.5 bg-mediterranean rounded-full mx-auto"></div>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-sand-dark/10 w-full overflow-hidden">
            <div 
              className="w-full text-gray-600 leading-relaxed text-[17px] font-medium
                         [&_p]:mb-6
                         [&_strong]:font-bold [&_strong]:text-mediterranean-dark 
                         [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:text-gray-900
                         [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-5 [&_h2]:text-gray-900"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>
        </div>
      </section>

      {/* 4. ÇALIŞMA ALANLARI / HİZMETLER */}
      <section className="py-24 bg-white border-t border-sand-dark/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-widest text-mediterranean uppercase mb-4">UZMANLIK ALANLARIM</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Çalışma Alanlarım
            </h2>
            <div className="w-24 h-1.5 bg-mediterranean rounded-full mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {calismaAlanlari.map((alan, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-sand-light rounded-bl-full -z-10 transition-transform group-hover:scale-125"></div>
                <div className="w-14 h-14 mb-6 bg-mediterranean/10 rounded-2xl flex items-center justify-center text-mediterranean">
                  {alan.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-mediterranean transition-colors">{alan.title}</h3>
                <p className="text-sm text-gray-500 font-medium leading-relaxed flex-grow">{alan.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NİHAİ CTA ALANI */}
      <section className="py-24 bg-mediterranean text-white text-center relative overflow-hidden">
        {/* Dekoratif Arka Plan Şekilleri */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-mediterranean-dark rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-mediterranean-light rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <p className="text-xs font-bold tracking-widest text-sand uppercase mb-4">İLK ADIM</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Birlikte İlerlemeye Hazır mısınız?
          </h2>
          <p className="text-white/90 mb-10 max-w-lg mx-auto leading-relaxed text-lg">
            İçsel yolculuğunuzda size eşlik etmek için buradayım. Randevu almak veya soru sormak için iletişime geçebilirsiniz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/randevu" className="bg-sand text-mediterranean-dark px-10 py-4 rounded-xl font-bold hover:bg-white hover:scale-105 transition-all shadow-lg text-lg">
              Randevu Al
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
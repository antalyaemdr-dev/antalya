import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSummary() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Sol: Şık Görsel Alanı (Z-Pattern) */}
          <div className="w-full lg:w-1/2 relative">
            {/* Altın Sarısı Dekoratif Çerçeve Efekti */}
            <div className="absolute -inset-4 border-2 border-[#e6c15c] rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform duration-500 hover:translate-x-6 hover:translate-y-6"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] group">
              {/* Not: Buradaki linki Meryem Hanım'ın profesyonel bir portre fotoğrafıyla değiştirin */}
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800" 
                alt="Meryem Gül Eren"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-[#031321]/10"></div>
            </div>
          </div>

          {/* Sağ: Zarif İçerik ve Tipografi */}
          <div className="w-full lg:w-1/2">
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block">
              Kurucu & Psikolojik Danışman
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#031321] mb-8 leading-tight">
              Meryem Gül Eren
            </h2>
            
            <div className="space-y-6 text-gray-500 font-light leading-relaxed text-lg">
              <p>
                İnsan psikolojisine duyduğum derin ilgi ve iyileşmeye olan inancımla çıktığım bu yolda, danışanlarıma güvenli, şefkatli ve bilimsel temellere dayanan profesyonel bir alan sunmayı amaçlıyorum.
              </p>
              <p>
                Avrupa akredite EMDR Terapisi ve yenilikçi psikolojik danışmanlık yaklaşımlarını bütünleştirerek; travma, kaygı bozuklukları, ilişki dinamikleri ve kişisel gelişim süreçlerinde bireylere ve çiftlere rehberlik ediyorum.
              </p>
              
              {/* İddialı Alıntı Köşesi */}
              <div className="pt-4 pb-2">
                <p className="font-medium text-[#031321] italic border-l-4 border-[#e6c15c] pl-5 py-2 text-xl">
                  "Her bireyin hikayesi biriciktir ve iyileşme, yargılanmadan anlaşıldığını hissettiğin an başlar."
                </p>
              </div>
            </div>

            <div className="mt-10">
              <Link 
                href="/hakkimda"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#031321] text-white rounded-xl font-bold hover:bg-[#006699] transition-all shadow-lg shadow-[#031321]/20 group"
              >
                Hakkımda Daha Fazla Bilgi
                <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
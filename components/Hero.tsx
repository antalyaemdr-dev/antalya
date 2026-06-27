import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Metin ve Aksiyon Alanı */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
          <span className="inline-block py-1.5 px-4 rounded-full bg-sand-light text-mediterranean-dark text-xs font-bold tracking-widest mb-6 uppercase border border-sand">
            Psikolojik Danışmanlık
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Geçmişin Yüklerinden <span className="text-mediterranean">Özgürleşin</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
            Meryem Gül Eren ile Antalya'da profesyonel EMDR terapisi, bireysel ve aile danışmanlığı hizmetleriyle daha dengeli ve huzurlu bir yaşama adım atın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/randevu" className="flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-mediterranean rounded-xl hover:bg-mediterranean-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              Hemen Randevu Al
            </Link>
            <Link href="/hizmetlerimiz" className="flex items-center justify-center px-8 py-4 text-base font-bold text-mediterranean bg-white border-2 border-sand-dark/30 rounded-xl hover:border-mediterranean hover:bg-sand-light/50 transition-all">
              Hizmetleri İncele
            </Link>
          </div>
        </div>

        {/* Görsel Alanı */}
        <div className="w-full lg:w-1/2 relative z-10">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] md:aspect-[5/4] bg-sand-light border-4 border-white">
            {/* Geçici bir placeholder koyuyoruz. Buraya gerçek fotoğraf gelecek. */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-mediterranean-light/60 p-6 text-center">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="font-semibold text-lg">Meryem Hanım'ın Fotoğrafı veya<br/>Ferah Bir Klinik Görseli</span>
            </div>
            
            {/* Gerçek resim eklemek için bu yorum satırını açıp kullanabilirsin:
            <Image 
              src="/images/hero-gorseli.webp" 
              alt="Meryem Gül Eren EMDR Terapisi" 
              fill
              className="object-cover"
              priority
            /> */}
          </div>
          
          {/* Dekoratif Şekiller (Tasarıma derinlik katar) */}
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sand rounded-full -z-10 opacity-60"></div>
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-mediterranean/10 rounded-full -z-10"></div>
        </div>

      </div>
      
      {/* Arka Plan Sağ Taraf Dekoratif Kum Rengi Alanı */}
      <div className="absolute top-0 right-0 w-full lg:w-1/3 h-full bg-sand-light/50 rounded-l-[120px] -z-0 hidden lg:block"></div>
    </section>
  );
}
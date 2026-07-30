import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="relative py-24 bg-[#006699] overflow-hidden">
      {/* Dekoratif Arka Plan Işıkları */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-96 h-96 bg-white/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-96 h-96 bg-[#e6c15c]/20 rounded-full blur-[100px]"></div>
      
      {/* Kodun geri kalanı aynı kalacak... */}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          Değişim İçin İlk Adımı <br className="hidden md:block" /> Atmaya Hazır mısınız?
        </h2>
        <p className="text-lg md:text-xl text-white/70 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          İçsel yolculuğunuzda size eşlik etmek ve daha sağlıklı bir yarına adım atmanız için güvenli bir alan sunuyoruz.
        </p>
        <Link 
          href="/randevu" 
          className="inline-flex items-center justify-center px-10 py-5 bg-[#e6c15c] text-[#031321] text-lg font-extrabold rounded-xl hover:bg-white transition-all duration-300 shadow-xl shadow-[#e6c15c]/20 transform hover:-translate-y-1"
        >
          Hemen Randevu Alın
        </Link>
      </div>
    </section>
  );
}
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-mediterranean-dark text-sand-light pt-16 pb-8 mt-20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Marka ve Kısa Bilgi */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="inline-block mb-6 bg-sand-light/10 p-3 rounded-xl backdrop-blur-sm">
            <Image 
              src="/images/logo/logo.webp" 
              alt="Antalya EMDR Logo" 
              width={200} 
              height={60} 
              className="h-12 w-auto object-contain brightness-0 invert" 
              // Not: CSS ile logoyu beyaz yapmaya çalıştık (brightness-0 invert). 
              // Eğer bu efekt logonun yapısını bozarsa class'tan bu iki kelimeyi silebilirsin.
            />
          </Link>
          <p className="text-sand/90 max-w-sm leading-relaxed text-sm">
            Meryem Gül Eren yönetiminde; bireysel danışmanlık, çift ve aile danışmanlığı ile profesyonel EMDR terapi hizmetleri.
          </p>
        </div>
        
        {/* Hızlı Linkler */}
        <div>
          <h3 className="font-bold text-white mb-6 tracking-wide text-lg">Hızlı Linkler</h3>
          <ul className="space-y-3 flex flex-col">
            <Link href="/hakkimda" className="text-sm text-sand/80 hover:text-sand transition-colors">Hakkımda</Link>
            <Link href="/hizmetlerimiz" className="text-sm text-sand/80 hover:text-sand transition-colors">Hizmetlerimiz</Link>
            <Link href="/blog" className="text-sm text-sand/80 hover:text-sand transition-colors">Blog</Link>
            <Link href="/iletisim" className="text-sm text-sand/80 hover:text-sand transition-colors">İletişim</Link>
          </ul>
        </div>

        {/* Yasal Linkler */}
        <div>
          <h3 className="font-bold text-white mb-6 tracking-wide text-lg">Yasal</h3>
          <ul className="space-y-3 flex flex-col">
            <Link href="/kvkk" className="text-sm text-sand/80 hover:text-sand transition-colors">KVKK Aydınlatma Metni</Link>
            <Link href="/cerez-politikasi" className="text-sm text-sand/80 hover:text-sand transition-colors">Çerez Politikası</Link>
          </ul>
        </div>
      </div>
      
      {/* Alt Çizgi ve Telif */}
      <div className="container mx-auto px-4 md:px-8 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-sand/60">
        <p>&copy; {new Date().getFullYear()} Antalya EMDR. Tüm hakları saklıdır.</p>
        <p className="mt-2 md:mt-0">Ela Teknoloji ve Tasarım tarafından sevgiyle hazırlandı.</p>
      </div>
    </footer>
  );
}
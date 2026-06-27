import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8">
        
        {/* Logo Alanı */}
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo/logo.webp" 
            alt="Antalya EMDR ve Psikolojik Danışmanlık Logo" 
            width={260} 
            height={80} 
            className="h-16 w-auto object-contain"
            priority 
          />
        </Link>
        
        {/* Masaüstü Menü - Alt Çizgili Animasyon */}
        <nav className="hidden md:flex items-center gap-8 mt-2">
          {/* Örnek: Aktif/Seçili Menü (Ana Sayfa) */}
          <Link href="/" className="relative text-sm font-bold text-mediterranean transition-colors pb-2 after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-sand-dark after:rounded-t-md">
            Ana Sayfa
          </Link>

          {/* Diğer Menüler - Hover (Üzerine gelince) animasyonlu */}
          <Link href="/hakkimda" className="group relative text-sm font-semibold text-gray-700 hover:text-mediterranean transition-colors pb-2">
            Hakkımda
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-sand-dark rounded-t-md transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link href="/hizmetlerimiz" className="group relative text-sm font-semibold text-gray-700 hover:text-mediterranean transition-colors pb-2">
            Hizmetlerimiz
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-sand-dark rounded-t-md transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link href="/blog" className="group relative text-sm font-semibold text-gray-700 hover:text-mediterranean transition-colors pb-2">
            Blog
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-sand-dark rounded-t-md transition-all duration-300 group-hover:w-full"></span>
          </Link>
          
          <Link href="/iletisim" className="group relative text-sm font-semibold text-gray-700 hover:text-mediterranean transition-colors pb-2">
            İletişim
            <span className="absolute bottom-0 left-0 h-1 w-0 bg-sand-dark rounded-t-md transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Aksiyon Alanı */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/randevu" className="rounded-xl bg-mediterranean px-7 py-3 text-sm font-bold text-white transition-all hover:bg-mediterranean-dark shadow-md hover:shadow-lg hover:-translate-y-0.5">
            Randevu Al
          </Link>
        </div>

        {/* Mobil Menü İkonu */}
        <button className="md:hidden p-2 text-mediterranean">
          <Menu size={32} />
        </button>
      </div>
    </header>
  );
}
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* 
        Sırasıyla buralara eklenecekler:
        - Hizmetlerimiz (<Services />)
        - Harekete Geçirici Mesaj / CTA (<CallToAction />)
        - Son Blog Yazıları (<RecentBlogs />)
        - İletişim / Randevu Özeti (<ContactPreview />)
      */}
      
    </div>
  );
}
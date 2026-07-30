import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RecentBlogs() {
  const blogs = [
    {
      id: 1,
      title: "EMDR Terapisi Nedir ve Nasıl Uygulanır?",
      excerpt: "Travma tedavisinde devrim yaratan EMDR terapisinin bilimsel temelleri ve seans süreçleri hakkında detaylı bir rehber.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800",
      date: "12 Ekim 2026",
      category: "Terapi Yöntemleri",
      slug: "emdr-terapisi-nedir"
    },
    {
      id: 2,
      title: "Kaygı ile Başa Çıkmanın 5 Etkili Yolu",
      excerpt: "Günlük hayatta karşılaştığımız stres ve anksiyete ile başa çıkabilmek için klinik olarak kanıtlanmış pratik yöntemler.",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800",
      date: "28 Eylül 2026",
      category: "Psikoloji",
      slug: "kaygi-ile-basa-cikma"
    },
    {
      id: 3,
      title: "İlişkilerde Sağlıklı Sınırlar Çizmek",
      excerpt: "Kendimizi korurken karşımızdakini incitmeden, sağlıklı ve sürdürülebilir sınırlar koymanın psikolojik temelleri.",
      image: "https://images.unsplash.com/photo-1520159495034-7067fb21a367?q=80&w=800",
      date: "15 Eylül 2026",
      category: "İlişkiler",
      slug: "iliskilerde-sinir-cizmek"
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-[#e6c15c] font-medium tracking-widest uppercase text-xs mb-4 block">
              Uzman Kaleminden
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#031321]">
              Güncel Makaleler
            </h2>
          </div>
          <Link href="/blog" className="text-[#006699] font-bold hover:text-[#031321] transition-colors flex items-center group">
            Tüm Yazıları Gör <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#031321]">
                    {blog.category}
                  </div>
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-gray-400 text-sm mb-3 block">{blog.date}</span>
                  <h3 className="text-xl font-bold text-[#031321] mb-4 group-hover:text-[#006699] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {blog.excerpt}
                  </p>
                  <span className="text-sm font-bold text-[#e6c15c] uppercase tracking-wider group-hover:text-[#006699] transition-colors flex items-center">
                    Devamını Oku <ArrowRight size={16} className="ml-2" />
                  </span>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
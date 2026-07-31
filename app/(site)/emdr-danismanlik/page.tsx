import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Supabase client bağlantısı
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ==========================================
// İSTEDİĞİNİZ SLUG'LARI BURAYA EKLEYEBİLİRSİNİZ
// ==========================================
const EMDR_SLUGS = [
  'emdr-asamalari-nedir',
  'emdr-kullanim-alanlari',
  'emdr-nasil-calisir',
  'emdr-nasil-yapilir',
  'emdr-danismanlik-nedir',
  'emdr-acinin-silinmesi',
];

// HTML etiketlerini ve &nbsp; gibi özel karakterleri temizleyen gelişmiş fonksiyon
function stripHtml(html: string) {
  if (!html) return '';
  // HTML etiketlerini temizle
  let cleanText = html.replace(/<[^>]*>?/gm, '');
  // &nbsp; ve benzeri HTML entity'lerini normal boşluğa çevir
  cleanText = cleanText.replace(/&nbsp;/gi, ' ');
  // Fazla boşlukları ve satır sonlarını teke indir
  return cleanText.replace(/\s+/g, ' ').trim();
}

async function getEmdrPosts() {
  if (EMDR_SLUGS.length === 0) return [];

  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .in('slug', EMDR_SLUGS);

  if (error) {
    console.error('EMDR yazıları çekilirken hata oluştu:', error.message);
    return [];
  }

  return data || [];
}

export const revalidate = 60; 

export default async function EmdrConsultingPage() {
  const posts = await getEmdrPosts();

  return (
    <div className="min-h-screen bg-white py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 xl:px-12">
        
        {/* Sayfa Başlığı ve Açıklama */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium block mb-3">
            Uzmanlık Alanı
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-light text-gray-900 tracking-tight mb-6">
            EMDR Danışmanlık ve Terapi Süreçleri
          </h1>
          <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
            Geçmişin yüklerinden kurtulmak, travmatik anıları yeniden işlemek ve zihinsel dengeyi sağlamak için EMDR terapisi hakkında güncel makalelerimiz.
          </p>
        </div>

        {/* Yazıların Listelendiği Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post: any) => {
            const rawDescription = post.summary || post.content || 'Detaylar için yazıyı inceleyin...';
            const cleanDescription = stripHtml(rawDescription);

            return (
              <Link 
                key={post.id || post.slug} 
                href={`/blog/${post.slug}`} 
                className="group flex flex-col bg-[#faf9f5] border border-gray-100 overflow-hidden cursor-pointer"
              >
                <div className="relative w-full aspect-[16/10] bg-gray-100 overflow-hidden">
                  {post.image_url ? (
                    <img 
                      src={post.image_url} 
                      alt={post.title || 'EMDR Yazısı'} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-300 text-xs">Görsel Yok</div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 block mb-2 font-mono">
                      EMDR Terapi
                    </span>
                    <h3 className="text-xl font-serif font-light text-gray-900 mb-3 group-hover:opacity-70 transition-opacity">
                      {post.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 font-light line-clamp-2 leading-relaxed">
                      {cleanDescription}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center text-[10px] uppercase tracking-[0.2em] text-gray-900 font-medium border-b border-gray-900 pb-1 w-max">
                    Yazıyı Oku &rarr;
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {posts.length === 0 && (
          <div className="py-12 border-t border-gray-100">
            <p className="text-gray-400 font-light text-sm">
              Belirtilen slug listesine ait yazı bulunamadı. Lütfen dosya içerisindeki <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-xs">EMDR_SLUGS</code> dizisini kontrol edin.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
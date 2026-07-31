import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const BASE_URL = 'https://www.antalyaemdr.com.tr';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Ana Statik Sayfalar
  const staticPages = [
    '',
    '/hakkimda',
    '/emdr-danismanlik',
    '/hizmetlerimiz',
    '/blog',
    '/oneriler',
    '/online-testler',
    '/iletisim',
    '/yasal-uyarilar',
    '/gizlilik-politikasi',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Blog Tekil Sayfaları (created_at kullanıldı)
  let blogPages: MetadataRoute.Sitemap = [];
  const { data: blogs } = await supabase.from('blogs').select('slug, created_at');
  if (blogs) {
    blogPages = blogs.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.created_at ? new Date(post.created_at) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    }));
  }

  // 3. Hizmet Tekil Sayfaları (created_at kullanıldı)
  let servicePages: MetadataRoute.Sitemap = [];
  const { data: services } = await supabase.from('services').select('slug, created_at');
  if (services) {
    servicePages = services.map((service) => ({
      url: `${BASE_URL}/hizmetlerimiz/${service.slug}`,
      lastModified: service.created_at ? new Date(service.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  }

  // 4. Öneri Tekil Sayfaları (slug yerine id kullanıldı)
  let recommendationPages: MetadataRoute.Sitemap = [];
  const { data: recommendations } = await supabase.from('recommendations').select('id, created_at');
  if (recommendations) {
    recommendationPages = recommendations.map((item) => ({
      url: `${BASE_URL}/oneriler/${item.id}`,
      lastModified: item.created_at ? new Date(item.created_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  }

  return [...staticPages, ...blogPages, ...servicePages, ...recommendationPages];
}
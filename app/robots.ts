import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = 'https://www.antalyaemdr.com.tr';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/private/'], // Varsa admin paneli veya gizli dizinleri arama motorlarından gizler
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
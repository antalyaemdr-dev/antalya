import { NextResponse } from 'next/server';
import { BetaAnalyticsDataClient } from '@google-analytics/data';

export async function GET() {
  try {
    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Ortam değişkenlerinden gelen string içindeki kaçış karakterlerini (\n) gerçek yeni satırlara çevirir
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
    });

    const propertyId = process.env.GA_PROPERTY_ID;

    // Son 7 günün verisini çekiyoruz
    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    // Veriyi grafiğe uygun formata (JSON) çeviriyoruz
    const trafficData = response.rows?.map((row) => ({
      date: row.dimensionValues?.[0].value,
      users: parseInt(row.metricValues?.[0].value || '0', 10),
      views: parseInt(row.metricValues?.[1].value || '0', 10),
    })) || [];

    return NextResponse.json({ success: true, data: trafficData });
  } catch (error) {
    console.error('Analytics çekilirken hata oluştu:', error);
    return NextResponse.json({ success: false, error: 'Veri çekilemedi' }, { status: 500 });
  }
}
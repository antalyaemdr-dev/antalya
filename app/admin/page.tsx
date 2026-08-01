"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Users, Calendar, Briefcase, FileText, Loader2 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ appointments: 0, services: 0, blogs: 0 });
  const [visitorData, setVisitorData] = useState<any[]>([]);
  const [totalWeeklyVisitors, setTotalWeeklyVisitors] = useState(0);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);

  // GA'dan gelen "20260801" formatındaki tarihi "Pzt", "Sal" gibi kısa gün ismine çevirir
  const formatGADate = (dateString: string) => {
    if (!dateString) return '';
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1;
    const day = parseInt(dateString.substring(6, 8));
    const date = new Date(year, month, day);
    
    return date.toLocaleDateString('tr-TR', { weekday: 'short' });
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      // 1. Supabase Verilerini Çek
      // count: 'exact' kullandığımız için veriyi değil doğrudan rakamı alıyoruz (Çok daha hızlıdır)
      const [apt, srv, blg] = await Promise.all([
        supabase.from('appointments').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true })
      ]);
      
      setStats({
        appointments: apt.count || 0,
        services: srv.count || 0,
        blogs: blg.count || 0
      });

      // 2. Google Analytics Verilerini Çek (GÜVENLİ FETCH)
      try {
        const res = await fetch('/api/analytics');
        
        // Gelen yanıtın gerçekten JSON olup olmadığını kontrol ediyoruz
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const json = await res.json();
          
          if (json.success && json.data) {
            const formattedData = json.data.map((item: any) => ({
              name: formatGADate(item.date),
              ziyaret: item.users
            }));
            
            setVisitorData(formattedData);
            const total = formattedData.reduce((acc: number, curr: any) => acc + curr.ziyaret, 0);
            setTotalWeeklyVisitors(total);
          }
        } else {
          // JSON değilse HTML/Metin hatası dönmüştür, sayfayı çökertmeden konsola yazdırıyoruz
          const textError = await res.text();
          console.error("API JSON yerine HTML döndürdü. Yollar veya ENV ayarları hatalı olabilir:", textError);
        }
      } catch (error) {
        console.error("Analytics verisi çekilemedi:", error);
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { title: "Toplam Randevu", value: stats.appointments, icon: <Calendar size={28}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Aktif Hizmetler", value: stats.services, icon: <Briefcase size={28}/>, color: "text-[#e6c15c]", bg: "bg-[#e6c15c]/10" },
    { title: "Yayındaki Bloglar", value: stats.blogs, icon: <FileText size={28}/>, color: "text-green-600", bg: "bg-green-50" },
    { 
      title: "Bu Hafta Ziyaretçi", 
      value: isLoadingAnalytics ? "..." : totalWeeklyVisitors.toLocaleString('tr-TR'), 
      icon: <Users size={28}/>, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    }
  ];

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Hoş Geldiniz, Meryem Hanım 👋</h1>
        <p className="text-gray-500 mt-2">Sitenizin güncel durumu ve özet istatistikleriniz aşağıdadır.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 font-medium text-sm mb-1">{stat.title}</p>
              <h3 className="text-3xl font-extrabold text-[#031321]">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Grafik Alanı */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative min-h-[400px]">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-extrabold text-[#031321]">Gerçek Zamanlı Haftalık Trafik</h2>
          <span className="flex items-center gap-2 text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Canlı Veri (GA4)
          </span>
        </div>
        
        {isLoadingAnalytics ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10">
            <Loader2 className="w-8 h-8 text-[#006699] animate-spin mb-4" />
            <p className="text-[#006699] font-medium">Google Analytics verileri senkronize ediliyor...</p>
          </div>
        ) : visitorData.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-gray-400 font-medium">
            Henüz yeterli trafik verisi oluşmadı.
          </div>
        ) : (
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dx={-10} />
                <Tooltip 
  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
  cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
  formatter={(value: any) => [value, 'Ziyaretçi']}
  labelFormatter={(label: any) => `${label} Günü`}
/>
                <Line 
                  type="monotone" 
                  dataKey="ziyaret" 
                  stroke="#006699" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#e6c15c', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8 }} 
                  animationDuration={1500}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Users, Calendar, Briefcase, FileText } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ appointments: 0, services: 0, blogs: 0 });

  // İleride Google Analytics bağlandığında gerçek veri basılabilir, şu an görsel zenginlik için mock data.
  const visitorData = [
    { name: 'Pzt', ziyaret: 120 }, { name: 'Sal', ziyaret: 150 }, { name: 'Çar', ziyaret: 180 },
    { name: 'Per', ziyaret: 140 }, { name: 'Cum', ziyaret: 210 }, { name: 'Cts', ziyaret: 250 }, { name: 'Paz', ziyaret: 280 },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      const [apt, srv, blg] = await Promise.all([
        supabase.from('appointments').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('blogs').select('id', { count: 'exact' })
      ]);
      
      setStats({
        appointments: apt.count || 0,
        services: srv.count || 0,
        blogs: blg.count || 0
      });
    };
    fetchStats();
  }, []);

  const statCards = [
    { title: "Toplam Randevu", value: stats.appointments, icon: <Calendar size={28}/>, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Aktif Hizmetler", value: stats.services, icon: <Briefcase size={28}/>, color: "text-[#e6c15c]", bg: "bg-[#e6c15c]/10" },
    { title: "Yayındaki Bloglar", value: stats.blogs, icon: <FileText size={28}/>, color: "text-green-600", bg: "bg-green-50" },
    { title: "Bu Hafta Ziyaret", value: "1,330", icon: <Users size={28}/>, color: "text-purple-600", bg: "bg-purple-50" } // Örnek Veri
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
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-extrabold text-[#031321] mb-8">Haftalık Web Sitesi Trafiği (Temsili)</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitorData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF'}} dx={-10} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                cursor={{ stroke: '#f3f4f6', strokeWidth: 2 }}
              />
              <Line type="monotone" dataKey="ziyaret" stroke="#006699" strokeWidth={4} dot={{ r: 6, fill: '#e6c15c', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
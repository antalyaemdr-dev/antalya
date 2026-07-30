"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { LogOut, Calendar, Clock, User, Phone, Mail } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // 1. GÜVENLİK KONTROLÜ: Kullanıcı giriş yapmış mı?
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Oturum yoksa login sayfasına at
        router.push("/admin/login");
      } else {
        // Oturum varsa randevuları çek ve sayfayı göster
        fetchAppointments();
      }
    };

    checkAuth();
  }, [router]);

  // 2. VERİ ÇEKME: Veritabanındaki randevuları getir
  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false }); // En yeni randevular en üstte

    if (data) {
      setAppointments(data);
    }
    setIsLoading(false);
  };

  // 3. ÇIKIŞ YAPMA İŞLEMİ
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Yükleme esnasında boş beyaz ekran yerine loader göster
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-mediterranean"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Üst Menü (Admin Header) */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Yönetim Paneli</h1>
          <p className="text-sm text-gray-500 font-medium">Hoş geldiniz, tüm randevu ve talepleri buradan yönetebilirsiniz.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
        >
          <LogOut size={18} /> Çıkış Yap
        </button>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="p-8 max-w-7xl mx-auto">
        
        {/* İstatistik Kartları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-mediterranean/10 text-mediterranean rounded-xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold">Toplam Randevu Talebi</p>
              <p className="text-2xl font-extrabold text-gray-900">{appointments.length}</p>
            </div>
          </div>
        </div>

        {/* Randevular Tablosu */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900">Son Gelen Randevular</h2>
          </div>
          
          <div className="overflow-x-auto">
            {appointments.length === 0 ? (
              <div className="p-8 text-center text-gray-500 font-medium">
                Henüz bir randevu talebi bulunmuyor.
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-sm text-gray-500 uppercase tracking-wider">
                    <th className="p-4 font-bold">Danışan</th>
                    <th className="p-4 font-bold">İletişim</th>
                    <th className="p-4 font-bold">Hizmet & Tip</th>
                    <th className="p-4 font-bold">Mesaj</th>
                    <th className="p-4 font-bold">Tarih</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                      
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-sand-light text-mediterranean-dark font-bold flex items-center justify-center">
                            {app.first_name[0]}{app.last_name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{app.first_name} {app.last_name}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4 space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone size={14} className="text-gray-400" /> {app.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail size={14} className="text-gray-400" /> {app.email}
                        </div>
                      </td>
                      
                      <td className="p-4">
                        <p className="font-bold text-mediterranean-dark text-sm">{app.service}</p>
                        <span className="inline-block mt-1 px-2.5 py-1 text-xs font-bold bg-sand-light text-gray-700 rounded-md">
                          {app.type}
                        </span>
                      </td>
                      
                      <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                        {app.message || "-"}
                      </td>
                      
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                          <Clock size={14} /> 
                          {new Date(app.created_at).toLocaleDateString("tr-TR")}
                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
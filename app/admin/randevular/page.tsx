"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Trash2, Mail, Phone, Calendar as CalIcon, Eye, X, User } from "lucide-react";

export default function RandevularAdmin() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedApt, setSelectedApt] = useState<any>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (data) setAppointments(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bu randevu talebini silmek istediğinize emin misiniz?")) {
      await supabase.from("appointments").delete().eq("id", id);
      fetchAppointments();
      if (selectedApt && selectedApt.id === id) setSelectedApt(null);
    }
  };

  // VİCDANLI VERİ ÇEKİCİLER (first_name ve last_name'i birleştirir)
  const getName = (apt: any) => {
    const combined = [apt.first_name, apt.last_name].filter(Boolean).join(" ");
    return combined || apt.full_name || apt.name || "İsimsiz Kayıt";
  };
  const getPhone = (apt: any) => apt.phone || apt.telefon || "-";
  const getEmail = (apt: any) => apt.email || apt.eposta || "";
  const getService = (apt: any) => apt.service_type || apt.service || "Belirtilmemiş";

  return (
    <div className="max-w-7xl mx-auto pb-32 relative">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Gelen Randevu Talepleri</h1>
        <span className="bg-[#006699]/10 text-[#006699] font-bold px-3 py-1 rounded-full">{appointments.length} Kayıt</span>
      </div>
      
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Danışan</th>
              <th className="p-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">İletişim</th>
              <th className="p-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Hizmet & Tip</th>
              <th className="p-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider hidden md:table-cell">Kısa Mesaj</th>
              <th className="p-6 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Tarih</th>
              <th className="p-6 text-center text-xs font-extrabold text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {appointments.length === 0 && (
              <tr><td colSpan={6} className="p-12 text-center text-gray-400 font-medium">Henüz randevu talebi bulunmuyor.</td></tr>
            )}
            {appointments.map((apt) => {
              const clientName = getName(apt);
              const clientInitials = clientName !== "İsimsiz Kayıt" ? clientName.substring(0, 2).toUpperCase() : "İB";

              return (
                <tr key={apt.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#031321] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {clientInitials}
                      </div>
                      <span className="font-extrabold text-[#031321]">{clientName}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1 text-sm">
                      <a href={`tel:${getPhone(apt)}`} className="flex items-center gap-2 text-gray-600 hover:text-[#006699] font-medium"><Phone size={14}/> {getPhone(apt)}</a>
                      {getEmail(apt) && <a href={`mailto:${getEmail(apt)}`} className="flex items-center gap-2 text-gray-500 hover:text-[#006699]"><Mail size={14}/> {getEmail(apt)}</a>}
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="font-bold text-[#006699] text-sm bg-[#006699]/5 px-3 py-1 rounded-lg">{getService(apt)}</span>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <p className="text-sm text-gray-500 line-clamp-1 max-w-[200px] italic" title={apt.message}>
                      {apt.message ? `"${apt.message}"` : '-'}
                    </p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-gray-600 text-sm font-medium">
                      <CalIcon size={14} className="text-gray-400"/>
                      {new Date(apt.created_at).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => setSelectedApt(apt)} className="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-bold text-xs shadow-sm" title="Detayları Oku">
                        <Eye size={16}/> Oku
                      </button>
                      <button onClick={() => handleDelete(apt.id)} className="flex items-center gap-1 bg-red-50 text-red-500 px-3 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold text-xs shadow-sm" title="Talebi Sil">
                        <Trash2 size={16}/> Sil
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selectedApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <div className="bg-[#031321] p-6 flex justify-between items-center text-white">
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                <CalIcon size={20} className="text-[#e6c15c]"/> 
                Randevu Detayı
              </h3>
              <button onClick={() => setSelectedApt(null)} className="text-white/50 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                <X size={24}/>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500">
                  <User size={32} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Danışan Adı</p>
                  <h4 className="text-2xl font-extrabold text-[#031321]">{getName(selectedApt)}</h4>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-gray-100 pb-6">
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase mb-1">Telefon</p>
                  <p className="text-lg font-medium text-[#031321]">{getPhone(selectedApt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase mb-1">E-Posta</p>
                  <p className="text-lg font-medium text-[#031321]">{getEmail(selectedApt) || "Belirtilmemiş"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase mb-1">Tercih Edilen Tarih</p>
                  <p className="text-lg font-medium text-[#031321]">{selectedApt.preferred_date ? new Date(selectedApt.preferred_date).toLocaleDateString('tr-TR') : "Belirtilmemiş"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase mb-1">Hizmet Seçimi</p>
                  <p className="text-lg font-bold text-[#006699]">{getService(selectedApt)}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold uppercase mb-3">Danışan Mesajı / Notu</p>
                <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed font-medium whitespace-pre-wrap border border-gray-100">
                  {selectedApt.message || "Danışan herhangi bir not bırakmamış."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
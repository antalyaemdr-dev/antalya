"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { Trash2 } from "lucide-react";

export default function RandevularAdmin() {
  const [appointments, setAppointments] = useState<any[]>([]);

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
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Randevu Talepleri</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 font-bold text-sm">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">Telefon</th>
              <th className="p-4">Hizmet / Konu</th>
              <th className="p-4 text-right">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {appointments.length === 0 && (
              <tr><td colSpan={5} className="p-8 text-center text-gray-500">Henüz randevu talebi bulunmuyor.</td></tr>
            )}
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm">{new Date(apt.created_at).toLocaleDateString('tr-TR')}</td>
                <td className="p-4 font-bold text-[#031321]">{apt.full_name}</td>
                <td className="p-4 text-[#006699] font-medium">{apt.phone}</td>
                <td className="p-4 text-sm text-gray-600">{apt.service_type || "Belirtilmemiş"}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(apt.id)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
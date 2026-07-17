"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { Lock, Mail, ShieldCheck } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Supabase ile e-posta ve şifre kontrolü
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.");
      setIsLoading(false);
    } else {
      // Başarılı olursa admin ana sayfasına yönlendir
      window.location.href = "/admin";
    }
  };

  return (
    <div className="min-h-screen bg-sand-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-sand-dark/20">
        
        {/* Üst Kısım */}
        <div className="bg-mediterranean-dark p-8 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-8 h-8 text-sand" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Yönetim Paneli</h1>
          <p className="text-sand-light/80 text-sm">Sisteme erişmek için giriş yapın.</p>
        </div>

        {/* Form Alanı */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Hata Mesajı */}
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-4 rounded-xl border border-red-100 font-medium text-center">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-posta</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all"
                  placeholder="admin@ornek.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-mediterranean focus:ring-2 focus:ring-mediterranean/20 outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-mediterranean text-white py-3.5 rounded-xl font-bold hover:bg-mediterranean-dark transition-all shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading ? 'Kontrol Ediliyor...' : 'Giriş Yap'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { 
  LayoutDashboard, Home, User, Briefcase, FileText, 
  Star, ClipboardList, Calendar, Settings, LogOut, Lock, ExternalLink
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
  { name: "Ana Sayfa", path: "/admin/anasayfa", icon: <Home size={20} /> },
  { name: "Hakkımda", path: "/admin/hakkimda", icon: <User size={20} /> },
  { name: "Hizmetlerimiz", path: "/admin/hizmetler", icon: <Briefcase size={20} /> },
  { name: "Blog", path: "/admin/blog", icon: <FileText size={20} /> },
  { name: "Öneriler", path: "/admin/oneriler", icon: <Star size={20} /> },
  { name: "Online Testler", path: "/admin/online-testler", icon: <ClipboardList size={20} /> },
  { name: "Randevular", path: "/admin/randevular", icon: <Calendar size={20} /> },
  { name: "Site Ayarları", path: "/admin/ayarlar", icon: <Settings size={20} /> },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Güvenlik State'leri
  const [session, setSession] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  
  // Giriş Formu State'leri
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Oturum Kontrolü
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Giriş Yapma İşlemi
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError("E-posta veya şifre hatalı. Lütfen tekrar deneyin.");
    }
    setIsLoggingIn(false);
  };

  // Çıkış Yapma İşlemi
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // 1. Durum: Henüz oturum kontrol ediliyor (Yükleniyor Ekranı)
  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#f3f4f6] text-[#006699] font-bold text-xl">Sistem Kontrol Ediliyor...</div>;
  }

  // 2. Durum: Oturum YOK (Giriş Ekranını Göster)
  if (!session) {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-4">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
          <div className="w-16 h-16 bg-[#006699]/10 text-[#006699] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-extrabold text-[#031321] text-center mb-2">Yönetim Paneli</h1>
          <p className="text-gray-500 text-center text-sm mb-8">Lütfen yetkili hesap bilgilerinizle giriş yapın.</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">E-Posta Adresi</label>
              <input 
                required type="email" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699]" 
                placeholder="ornek@mail.com" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Şifre</label>
              <input 
                required type="password" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 px-5 py-4 rounded-xl outline-none focus:border-[#006699]" 
                placeholder="••••••••" 
              />
            </div>
            
            {loginError && <div className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg text-center">{loginError}</div>}
            
            <button type="submit" disabled={isLoggingIn} className="w-full bg-[#031321] text-white py-4 rounded-xl font-extrabold text-lg hover:bg-[#006699] transition-all mt-4 shadow-lg shadow-[#031321]/20">
              {isLoggingIn ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Durum: Oturum VAR (Admin Panelini Göster)
  return (
    <div className="flex h-screen bg-[#f3f4f6]">
      {/* Sol Menü (Sidebar) */}
      <aside className="w-72 bg-[#031321] text-white flex flex-col shadow-2xl z-20">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-extrabold tracking-wide text-white">YÖNETİM<span className="text-[#e6c15c]">.</span></h2>
          <p className="text-sm text-gray-400 mt-1 font-medium">{session.user.email}</p>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold transition-all ${pathname === item.path ? "bg-[#006699] text-white shadow-lg" : "text-gray-300 hover:bg-white/5 hover:text-white"}`}>
              <span className={pathname === item.path ? "text-white" : "text-gray-400"}>{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Alt Kısım: Siteyi Görüntüle ve Çıkış Yap Butonları */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <a href="/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-[#e6c15c] hover:bg-white/5 transition-all">
            <ExternalLink size={20} /> Siteyi Görüntüle
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 overflow-y-auto p-10 bg-[#f3f4f6]">
        {children}
      </main>
    </div>
  );
}
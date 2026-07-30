"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User, Settings, ClipboardList, Briefcase, Calendar, Home } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { name: "Ana Sayfa", path: "/admin/anasayfa", icon: <Home size={20} /> },
    { name: "Hakkımda", path: "/admin/hakkimda", icon: <User size={20} /> },
    { name: "Hizmetlerimiz", path: "/admin/hizmetler", icon: <Briefcase size={20} /> },
    { name: "Online Testler", path: "/admin/online-testler", icon: <ClipboardList size={20} /> },
    { name: "Randevular", path: "/admin/randevular", icon: <Calendar size={20} /> },
    { name: "Site Ayarları", path: "/admin/ayarlar", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-[#031321] text-white flex flex-col fixed h-full z-50">
        <div className="p-6 text-center border-b border-white/10">
          <h2 className="text-2xl font-extrabold text-[#e6c15c]">Yönetim</h2>
          <p className="text-xs text-white/50 mt-1">Meryem Gül Eren</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? "bg-[#006699] text-white font-bold shadow-lg" : "text-white/70 hover:bg-white/5 hover:text-white"}`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
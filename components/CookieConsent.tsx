"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie_consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
  };

  // Sunucu ve istemci uyuşmazlığını (hydration error) önlemek için mount kontrolü
  if (!mounted || !showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 bg-gray-900/95 backdrop-blur-md border-t border-gray-800 text-white shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Cookie className="text-[#e6c15c] flex-shrink-0 mt-1" size={24} />
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
            Web sitemizden en iyi şekilde yararlanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için çerezler kullanmaktayız. Detaylı bilgi için <Link href="/yasal-uyarilar" className="text-[#e6c15c] underline hover:text-white transition-colors">Çerez Politikamızı</Link> inceleyebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0">
          <button
            onClick={acceptCookies}
            className="w-full md:w-auto bg-[#006699] hover:bg-[#004d73] text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors shadow-md cursor-pointer"
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
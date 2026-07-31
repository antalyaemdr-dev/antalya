"use client";

import { useState } from "react";
import { Shield, Cookie, FileText, Lock } from "lucide-react";

export default function YasalUyarilarPage() {
  const [activeTab, setActiveTab] = useState<"cerez-uygulamalari" | "cerez-aydinlatma" | "gizlilik" | "kullanim">("cerez-uygulamalari");

  return (
    <div className="min-h-screen bg-gray-50 py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Sayfa Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.2em] text-[#006699] font-bold block mb-3">
            Yasal Bilgilendirme
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-light text-gray-900">
            Yasal Uyarılar ve Politikalar
          </h1>
          <p className="text-sm text-gray-600 mt-3 font-light leading-relaxed">
            Web sitemizin kullanımı, veri gizliliği ve yasal koşullarımız hakkında detaylı bilgilere aşağıdan ulaşabilirsiniz.
          </p>
        </div>

        {/* Sekme Navigasyonu (Mobilde yatay kaydırılabilir, üst üste binmez) */}
        <div className="flex overflow-x-auto pb-4 mb-8 gap-2 border-b border-gray-200 scrollbar-none">
          <button
            onClick={() => setActiveTab("cerez-uygulamalari")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "cerez-uygulamalari"
                ? "bg-[#006699] text-white shadow-md shadow-[#006699]/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Cookie size={16} /> Çerez Uygulamaları
          </button>
          
          <button
            onClick={() => setActiveTab("cerez-aydinlatma")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "cerez-aydinlatma"
                ? "bg-[#006699] text-white shadow-md shadow-[#006699]/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Shield size={16} /> Çerez Aydınlatma
          </button>

          <button
            onClick={() => setActiveTab("gizlilik")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "gizlilik"
                ? "bg-[#006699] text-white shadow-md shadow-[#006699]/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <Lock size={16} /> Gizlilik Politikası
          </button>

          <button
            onClick={() => setActiveTab("kullanim")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === "kullanim"
                ? "bg-[#006699] text-white shadow-md shadow-[#006699]/20"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            <FileText size={16} /> Kullanım Şartları
          </button>
        </div>

        {/* İçerik Kutusu */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
          
          {/* 1. ÇEREZ UYGULAMALARI */}
          {activeTab === "cerez-uygulamalari" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Çerez (Cookies) Uygulamaları Politikası</h2>
                <p className="text-xs text-gray-400 mt-1">Son güncelleme tarihi: 20.02.2022</p>
              </div>

              <div className="space-y-4 text-sm md:text-base font-light">
                <p>
                  İşbu Çerez Uygulamaları Politikası, Meryem Gül Eren tarafından yürütülen ve bir <strong>Elika Psikoloji</strong> markası olan <a href="https://www.antalyaemdr.com.tr" className="text-[#006699] font-medium underline" target="_blank" rel="noopener noreferrer">https://www.antalyaemdr.com.tr</a> internet sitesi (“Antalya EMDR İnternet Sitesi”) için geçerlidir.
                </p>
                <p>
                  Meryem Gül Eren, deneyimlerinizi geliştirmek için Antalya EMDR İnternet Sitesi’nde çerezler kullanabilir. Kullanılan çerezler sisteminizden ve/veya sabit diskinizden herhangi bir bilgi toplamaz.
                </p>
                <p>
                  Antalya EMDR İnternet Sitesi’nde isim ve e-posta adresi ile tanımlanmazsınız; bununla beraber ilk girişinizde sayı ve dizinler atanır.
                </p>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Çerezler nedir?</h3>
                <p>
                  Çerezler, bilgisayarınızda veya mobil cihazınızda ziyaret ettiğiniz internet sitesi tarafından tarayıcınıza gönderilen küçük bir metin parçasıdır ve ziyaretinizle ilgili bilgileri (örneğin, tercih ettiğiniz dil ve diğer ayarlar) hatırlamasına yardımcı olur. Çerezler sayesinde bir sonraki ziyaretinizde daha iyi ve kişiselleştirilmiş müşteri deneyimi yaşarsınız. Çerezlerin kullanılma amacı, internet sitesini ziyaret eden kullanıcıya kolaylık sağlamaktır.
                </p>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Çerez Türleri ve Özellikleri</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Geçici çerezler:</strong> Sadece oturum sırasında geçici olarak depolanır ve en kısa sürede tarayıcınızı kapattıktan sonra kaldırılır.</li>
                  <li><strong>Kalıcı çerezler:</strong> Tarayıcı veya uygulamayı kapattıktan sonra bilgisayar/ mobil cihazda kalır ve internet sitesine döndüğümüzde sizi tanımak için kullanılır.</li>
                  <li><strong>Hedef/Reklam Çerezleri:</strong> Reklam çerezleri, üçüncü bir şahsa sitemize ziyaretinizle ilgili bazı bilgileri iletmek, kişiselleştirilmiş reklamlar göstermek, gösterilen reklam sayısını sınırlamak ve reklam kampanyasının etkinliğini ölçmek için kullanılır.</li>
                  <li><strong>Zorunlu Çerezler:</strong> Kullanıcı hesabı oluşturmanıza, giriş yapmanıza ve internet sitemizde gezinti yapmanıza olanak sağlayan önemli çerezlerdir.</li>
                  <li><strong>Performans ve analiz çerezleri:</strong> Ziyaretçilere daha iyi, hızlı ve güvenli bir kullanım sağlamak, müşteri deneyimini iyileştirmek amacıyla kullanılır.</li>
                  <li><strong>İşlevsellik çerezleri:</strong> Tercih ettiğiniz dil, düzen veya renk şeması gibi belirli ayarları hatırlamak için izin verir.</li>
                  <li><strong>İzleme çerezleri:</strong> Ziyaretçilerin internet tarama davranışlarını izlemek ve veri toplamak için kullanılır.</li>
                </ul>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Kullanım Amaçlarına Göre Çerez Türleri</h3>
                <p>Kullanım amaçlarına göre dört çeşit çerez bulunmaktadır: Oturum Çerezleri, Performans Çerezleri, Fonksiyonel Çerezler ve Reklam ve Üçüncü Taraf Çerezleri.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Oturum Çerezleri:</strong> İnternet sitelerinin düzgün çalışabilmesini ve sayfalar arasında bilgilerin taşınabilmesini sağlar.</li>
                  <li><strong>Performans Çerezleri:</strong> Sayfaların ziyaret sıklığı, hata iletileri ve sitede geçirilen zaman gibi bilgileri toplar.</li>
                  <li><strong>Fonksiyonel Çerezler:</strong> Kullanıcının site içinde yapmış olduğu seçeneklerin hatırlanmasını sağlar.</li>
                  <li><strong>Reklam ve Üçüncü Taraf Çerezleri:</strong> Üçüncü taraf tedarikçilerine ait çerezlerdir.</li>
                </ul>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Çerezleri Nasıl Kontrol Edebilir veya Silebilirsiniz?</h3>
                <p>
                  Genel olarak internet tarayıcıları çerezleri otomatik olarak kabul edecek şekilde ön tanımlıdır. Tarayıcı ayarlarından çerezleri engelleyebilir veya silebilirsiniz. www.allaboutcookies.org adresinden detaylı bilgi alabilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* 2. ÇEREZ AYDINLATMA METNİ */}
          {activeTab === "cerez-aydinlatma" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Çerezler Hakkında Aydınlatma Metni</h2>
              </div>

              <div className="space-y-4 text-sm md:text-base font-light leading-relaxed">
                <p>
                  <strong>Meryem Gül Eren</strong> olarak veri sorumlusu sıfatıyla (KVKK 10.a), internet sayfamızın kullanımını kolaylaştırmak, ürünlerimizi ilgi ve ihtiyaçlarınız doğrultusunda daha iyi bir şekilde özelleştirmek, gelecekte sitelerimiz üzerinde gerçekleştireceğiniz faaliyet ve deneyimleri hızlandırmak, ziyaretçilerimizin internet sayfamızı nasıl kullandıklarını anlayabilmek, sayfamızın yapısını ve içeriğini iyileştirebilmek, internet sayfamızı geliştirmek, kullanışlı, etkili ve güvenli hale getirmek amacıyla (KVKK 10.b) çerezler (cookies) vasıtasıyla verileriniz <em>“ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması”</em> hukuki sebebi ile tamamen veya kısmen otomatik yolla işlenmektedir (KVKK 10.ç).
                </p>
                <p>
                  Bu verileri, sosyal medya, tanıtım ve analiz oluşturma çözüm ortaklarımızla paylaşıyoruz (KVKK 10.c).
                </p>

                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3 my-4">
                  <h3 className="font-bold text-gray-900">KVKK’nın 11. Maddesi Kapsamındaki Haklarınız (KVKK 10.d):</h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                    <li><strong>a)</strong> Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                    <li><strong>b)</strong> Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,</li>
                    <li><strong>c)</strong> Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
                    <li><strong>ç)</strong> Kişisel verilerinizin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
                    <li><strong>d)</strong> Kişisel verilerinizin eksik veya yanlış işlenmiş ise düzeltilmesini isteme,</li>
                    <li><strong>e)</strong> Kanun’un 7. Maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,</li>
                    <li><strong>f)</strong> Kişisel verilerinizin aktarıldığı üçüncü kişilere yukarıda sayılan (d) ve (e) bentleri uyarınca yapılan işlemlerin bildirilmesini isteme,</li>
                    <li><strong>g)</strong> Kişisel verilerinizin münhasıran otomatik sistemler ile analiz edilmesi nedeniyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,</li>
                    <li><strong>ğ)</strong> Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğranılması halinde zararın giderilmesini talep etme.</li>
                  </ul>
                </div>

                <p>
                  Kanun’un 11. Maddesinde sayılan haklarınız konusunda taleplerinizi bize iletebilir ve sizin için hazırladığımız <strong>KVKK Talep Formu</strong>’muzu kullanabilirsiniz.
                </p>
                <p className="font-medium text-gray-900 pt-2 border-t">
                  Sitemizde gezinmeye devam etmeniz halinde cihazınızdaki çerezlere erişebileceğimizi de kabul ediyorsunuz. Ayrıntılı bilgiye ve çerezleri engelleme yöntemlerine Çerez Politikası’ndan ulaşabilirsiniz.
                </p>
              </div>
            </div>
          )}

          {/* 3. GİZLİLİK POLİTİKASI */}
          {activeTab === "gizlilik" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Gizlilik Politikası</h2>
                <p className="text-xs text-gray-400 mt-1">Antalya EMDR / Meryem Gül Eren</p>
              </div>

              <div className="space-y-4 text-sm md:text-base font-light leading-relaxed">
                <p>
                  Size ait verilerin güvenliğinin sizin için ne kadar önemli olduğunun bilincindeyiz. Veri Sorumlusu sıfatıyla hareket eden <strong>Meryem Gül Eren</strong> olarak kişisel verilerinize ve diğer gizli bilgilerinize saygı göstermeyi ve bu bilgilerin güvenliğini sağlamak için tüm makul önlemleri almayı taahhüt etmekteyiz.
                </p>
                <p>
                  İşbu Gizlilik Politikası yalnızca <a href="https://www.antalyaemdr.com.tr" className="text-[#006699] font-medium underline" target="_blank" rel="noopener noreferrer">https://www.antalyaemdr.com.tr</a> alan adı üzerinden verilen hizmetleri kapsar.
                </p>
                <div className="bg-gray-50 border-l-4 border-[#006699] p-4 text-xs md:text-sm font-medium text-gray-900 my-4">
                  SİTEYİ KULLANMANIZ, GİZLİLİK POLİTİKASI VE İLGİLİ KULLANIM KOŞULLARINI KABUL ETTİĞİNİZ ANLAMINA GELECEKTİR.
                </div>
                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Verilerinizin ve Kişisel Verilerinizin İşlenmesi</h3>
                <p>
                  Meryem Gül Eren ve anlaşmalı hizmet sağlayıcılarımız; randevularınızı oluşturabilmek, tıbbî teşhis, muayene, tedavi ve bakım hizmetlerini yürütebilmek, danışmanlık faaliyetlerini düzenleyebilmek amacıyla verilerinizi işlemektedir.
                </p>
                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">İletişim</h3>
                <p><strong>Posta Adresi:</strong> Dr. Tevfik Sağlam Cd. Murat Apt. No:5/4 Dikilitaş Bakırköy</p>
              </div>
            </div>
          )}

          {/* 4. KULLANIM ŞARTLARI (TAM VE EKSİKSİZ METİN) */}
          {activeTab === "kullanim" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="border-b pb-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900">Meryem Gül Eren İnternet Sitesi Kullanım Şartları</h2>
                <p className="text-xs text-gray-400 mt-1">Son güncelleme tarihi: 20.02.2022</p>
              </div>

              <div className="space-y-4 text-sm md:text-base font-light leading-relaxed">
                <p>
                  İnternet sitemizi ziyaret ettiğiniz için teşekkür ederiz. İşbu internet sitesini herhangi bir şekilde kullanmanız burada belirtilen Şart ve Koşulları kabul ettiğiniz anlamına geldiğinden, lütfen bu belgedeki Şart ve Koşulları dikkatle okuyun.
                </p>
                <p>
                  Bu sitede “biz”, “bizim,” ve “Meryem Gül Eren” ifadeleri Meryem Gül Eren’i anlatır. “Siz” bu internet sitesine erişim sağlayan ve/veya kullanan kişileri anlatır.
                </p>
                <p>
                  İşbu sözleşme, sitemiz kullanıcısı siz ve Meryem Gül Eren arasında akdedilen ve hususlarda mutabık kalındığını gösterir resmi bir sözleşmedir.
                </p>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs sm:text-sm">
                  <strong>Meryem Gül Eren Posta Adresi:</strong> Dr. Tevfik Sağlam Cd. Murat Apt. No:5/4 Dikilitaş Bakırköy<br />
                  <strong>İlgi:</strong> İnternet Sitesi Kullanım Şartları
                </div>

                <p>
                  Meryem Gül Eren Türkiye Cumhuriyeti’nin, güncel olarak <a href="https://www.antalyaemdr.com.tr" className="text-[#006699] underline" target="_blank" rel="noopener noreferrer">https://www.antalyaemdr.com.tr</a> adresinde hizmet veren internet sitesini kullanmakla, işbu Sözleşme’de düzenlenen kullanım şartlarıyla bağlı olduğunuzu kabul etmiş ve bunlara uyacağınızı taahhüt etmiş olursunuz.
                </p>

                <p className="font-medium text-red-600 bg-red-50 p-3 rounded-lg text-xs sm:text-sm">
                  EĞER İŞBU SÖZLEŞME VE AYRILMAZ BİR PARÇASI OLAN GİZLİLİK POLİTİKASI’NDA DÜZENLENEN HUSUSLARLA BAĞLI OLDUĞUNUZU KABUL ETMİYORSANIZ, SİTEDEN VE SUNULAN HİZMETLERDEN FAYDALANMAYINIZ.
                </p>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">SİTENİN ve HİZMETLERİN KULLANIMI</h3>
                <p>Site kullanıcıları ve sunulan hizmetlerden faydalanmak için bilgilerini bizimle paylaşmış olan kullanıcılar aşağıdaki hususları kabul ve taahhüt ederler:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Şifre ve Güvenlik:</strong> Sitedeki bazı hizmetlerden faydalanabilmeniz için iletişim bilgilerinizi paylaşmanız gerekmektedir ve işbu iletişim bilgilerinizin gizliliğini temin etmek kullanıcıların sorumluluğundadır.</li>
                  <li><strong>Gerçeğe Aykırı Bilgi Yasağı:</strong> Kullanıcılar, Meryem Gül Eren’e sahte, yanlış yönlendirici veya gerçeğe aykırı bilgiler vermemeyi kabul ve taahhüt ederler.</li>
                  <li><strong>Dürüstlük Kuralına Uygunluk:</strong> Site’de sunulan hizmetlerden faydalanmak isteyen kullanıcılar, eş zamanlı olarak tek bir başvuru yapabilirler. Yanlış ve yanıltıcı şekilde farklı başvurularda bulunulamaz.</li>
                </ul>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Fikri Mülkiyet Hakları</h3>
                <p>
                  Bu İnternet Sitesi’ndeki her tür metin, resim ve diğer materyale ait tüm telif hakları, ticari markalar ve diğer fikri mülkiyet hakları Meryem Gül Eren’e aittir veya ilgili sahibinin izniyle siteye dahil edilmiştir. İzinsiz çoğaltılamaz, satılamaz ve ticari kazanç amacıyla dağıtılamaz. ® Meryem Gül Eren, tescilli bir ticari markadır. Tüm hakları saklıdır.
                </p>

                <h3 className="text-lg font-serif font-bold text-gray-900 pt-3">Yargı Yetkisi ve Geçerli Kanun</h3>
                <p>
                  Tarafınız ve Meryem Gül Eren, bu İnternet Sitesi’nin kullanımından kaynaklanan veya kullanımıyla ilgili her tür ihtilaf veya davanın Türk hukukuna tabi olduğu hususunda mutabakata varırlar.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
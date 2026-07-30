import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FloatingButtons from "../../components/FloatingButtons";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
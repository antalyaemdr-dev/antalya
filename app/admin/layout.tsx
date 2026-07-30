export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* İleride buraya Admin Header veya Sol Menü (Sidebar) ekleyeceğiz */}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
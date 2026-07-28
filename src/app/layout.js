import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "DevLog — Blog Công Nghệ & Cloud Architecture",
  description: "Trang blog cá nhân chia sẻ về Next.js, AWS Cloud, DevOps và Kỹ thuật Phần mềm hiện đại.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main style={{ minHeight: "calc(100vh - 300px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { PostProvider } from "@/context/PostContext";

export const metadata = {
  title: "EngLog — Blog Học Tiếng Anh & Ngữ Pháp Căn Bản",
  description: "Trang blog chia sẻ bài học tiếng Anh, 12 thì cơ bản, từ vựng giao tiếp và phương pháp học hiệu quả mỗi ngày.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AuthProvider>
          <PostProvider>
            <Navbar />
            <main style={{ minHeight: "calc(100vh - 300px)" }}>
              {children}
            </main>
            <Footer />
          </PostProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

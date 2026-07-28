import BlogContent from "@/components/BlogContent";
import NewsletterCard from "@/components/NewsletterCard";

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      {/* Hero Header */}
      <section className="hero-section" style={{
        textAlign: "center",
        maxWidth: "780px",
        margin: "0 auto 4rem auto",
        padding: "2rem 0"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 16px",
          borderRadius: "var(--radius-full)",
          background: "rgba(99, 102, 241, 0.1)",
          border: "1px solid rgba(99, 102, 241, 0.25)",
          fontSize: "0.85rem",
          fontWeight: "600",
          color: "#a5b4fc",
          marginBottom: "1.5rem"
        }}>
          📚 English Grammar & Communication Hub
        </div>

        <h1 className="hero-title" style={{
          fontSize: "3rem",
          lineHeight: "1.15",
          letterSpacing: "-0.03em",
          marginBottom: "1.25rem"
        }}>
          Chinh Phục Tiếng Anh Dễ Dàng, <br/>
          <span className="gradient-text">Từ Cơ Bản Đến Tự Tin Giao Tiếp</span>
        </h1>

        <p className="hero-subtitle" style={{
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: "1.6",
          marginBottom: "2rem"
        }}>
          Tổng hợp kiến thức 12 thì cơ bản, mẹo ghi nhớ ngữ pháp, từ vựng chuyên ngành 
          và phương pháp luyện nói Shadowing hiệu quả mỗi ngày.
        </p>

        <div className="hero-buttons" style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a href="#articles" className="btn-primary">
            Khám phá bài học
          </a>
          <a href="#newsletter" className="btn-secondary">
            Đăng ký nhận bài mới
          </a>
        </div>
      </section>

      {/* Main Blog Section */}
      <BlogContent />

      {/* Newsletter Section */}
      <NewsletterCard />
    </div>
  );
}

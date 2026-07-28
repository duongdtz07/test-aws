import BlogContent from "@/components/BlogContent";
import NewsletterCard from "@/components/NewsletterCard";

export default function Home() {
  return (
    <div className="container" style={{ paddingTop: "3rem", paddingBottom: "3rem" }}>
      {/* Hero Header */}
      <section style={{
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
          🚀 Personal Engineering Log & Tech Insights
        </div>

        <h1 style={{
          fontSize: "3rem",
          lineHeight: "1.15",
          letterSpacing: "-0.03em",
          marginBottom: "1.25rem"
        }}>
          Khám phá Kỹ thuật Phần mềm, <br/>
          <span className="gradient-text">Cloud Architecture & Next.js</span>
        </h1>

        <p style={{
          fontSize: "1.1rem",
          color: "var(--text-muted)",
          lineHeight: "1.6",
          marginBottom: "2rem"
        }}>
          Nơi tổng hợp các bài viết kinh nghiệm thực tế về việc thiết kế hệ thống cloud, 
          tối ưu hóa hiệu năng ứng dụng web và tự động hóa quy trình CI/CD.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <a href="#articles" className="btn-primary">
            Khám phá bài viết
          </a>
          <a href="#newsletter" className="btn-secondary">
            Nhận tin mới
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

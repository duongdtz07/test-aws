"use client";

import { useState } from "react";

export default function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section id="newsletter" style={{ marginTop: "4rem" }}>
      <div className="glass-panel" style={{
        padding: "3.5rem 2rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(99, 102, 241, 0.12) 50%, rgba(168, 85, 247, 0.08) 100%)",
        border: "1px solid rgba(99, 102, 241, 0.25)"
      }}>
        <div style={{ maxWidth: "580px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <span className="tag-badge" style={{ marginBottom: "1rem" }}>✨ DEV NEWSLETTER</span>
          
          <h2 style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
            Đăng ký nhận bài viết mới hàng tuần
          </h2>
          
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
            Cập nhật những xu hướng công nghệ mới nhất về Next.js, Cloud, DevOps & AI trực tiếp vào hộp thư của bạn. Zero spam.
          </p>

          {submitted ? (
            <div className="animate-fade-in" style={{
              background: "rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              color: "#34d399",
              padding: "1rem 1.5rem",
              borderRadius: "var(--radius-md)",
              fontWeight: "500"
            }}>
              🎉 Cảm ơn bạn! Email của bạn đã được đăng ký thành công.
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{
              display: "flex",
              gap: "10px",
              maxWidth: "460px",
              margin: "0 auto",
              flexWrap: "wrap"
            }}>
              <input 
                type="email" 
                placeholder="Nhập email của bạn..." 
                className="input-glass"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ flex: "1 1 240px" }}
              />
              <button type="submit" className="btn-primary" style={{ flex: "0 0 auto" }}>
                Đăng ký ngay
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

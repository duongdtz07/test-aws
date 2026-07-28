import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/posts";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} — DevLog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Back button */}
      <Link href="/" className="btn-secondary" style={{
        display: "inline-flex",
        fontSize: "0.88rem",
        padding: "8px 16px",
        marginBottom: "2rem"
      }}>
        ← Quay lại trang chủ
      </Link>

      {/* Article Header */}
      <article>
        <header style={{ maxWidth: "800px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "1.25rem" }}>
            <span className="tag-badge">{post.category}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "flex", alignItems: "center" }}>
              • {post.readTime}
            </span>
          </div>

          <h1 style={{
            fontSize: "2.5rem",
            lineHeight: "1.2",
            marginBottom: "1.5rem"
          }}>
            {post.title}
          </h1>

          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px"
          }}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: "600" }}>{post.author.name}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                {post.author.role} • {post.date}
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="glass-panel" style={{
          maxWidth: "920px",
          height: "400px",
          margin: "0 auto 3rem auto",
          overflow: "hidden",
          padding: 0
        }}>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Article Body Container */}
        <div className="glass-panel" style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 2.5rem",
          fontSize: "1.05rem",
          lineHeight: "1.8",
          color: "var(--text-main)"
        }}>
          <div style={{ whiteSpace: "pre-line" }}>
            {post.content}
          </div>

          {/* Tags Footer */}
          <div style={{
            marginTop: "3rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid var(--border-glass)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: "0.78rem",
                  padding: "4px 10px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(255, 255, 255, 0.05)",
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-glass)"
                }}>
                  #{tag}
                </span>
              ))}
            </div>

            <button 
              className="btn-secondary" 
              style={{ fontSize: "0.82rem", padding: "6px 14px" }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Đã sao chép đường dẫn bài viết!");
                }
              }}
            >
              🔗 Chia sẻ bài viết
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{ maxWidth: "800px", margin: "4rem auto 0 auto" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>Bài viết liên quan</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {relatedPosts.map((rel) => (
              <Link key={rel.id} href={`/blog/${rel.slug}`}>
                <div className="glass-panel" style={{ padding: "1.5rem", height: "100%" }}>
                  <span className="tag-badge" style={{ marginBottom: "0.5rem" }}>{rel.category}</span>
                  <h4 style={{ fontSize: "1.1rem", margin: "0.5rem 0", lineHeight: "1.4" }}>{rel.title}</h4>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent-indigo)", fontWeight: "600" }}>Đọc ngay →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

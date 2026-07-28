"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePosts } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import ShareButton from "@/components/ShareButton";
import PostModal from "@/components/PostModal";

export default function ArticleDetail({ initialPost, slug }) {
  const { posts, deletePost } = usePosts();
  const { isAdmin } = useAuth();
  const router = useRouter();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Lookup dynamic post from PostContext or fallback to initialPost
  const post = posts.find(p => p.slug === slug) || initialPost;

  if (!post) {
    return (
      <div className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h2>Không tìm thấy bài học!</h2>
        <Link href="/" className="btn-primary" style={{ marginTop: "1rem", display: "inline-block" }}>
          Trở về trang chủ
        </Link>
      </div>
    );
  }

  const relatedPosts = posts.filter(p => p.id !== post.id).slice(0, 2);

  const handleDelete = () => {
    if (confirm(`Bạn có chắc chắn muốn xóa bài học "${post.title}"?`)) {
      deletePost(post.id);
      router.push("/");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem" }}>
      {/* Top Header Actions (Back & Admin Actions) */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <Link href="/" className="btn-secondary" style={{
          display: "inline-flex",
          fontSize: "0.88rem",
          padding: "8px 16px"
        }}>
          ← Quay lại trang chủ
        </Link>

        {isAdmin && (
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px" }}
            >
              ✏️ Chỉnh sửa bài học
            </button>
            <button 
              onClick={handleDelete}
              className="btn-secondary"
              style={{ fontSize: "0.85rem", padding: "8px 16px", color: "#f87171", borderColor: "rgba(239, 68, 68, 0.4)" }}
            >
              🗑️ Xóa bài học
            </button>
          </div>
        )}
      </div>

      {/* Article Header */}
      <article>
        <header className="article-header" style={{ maxWidth: "800px", margin: "0 auto 2.5rem auto", textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "1.25rem" }}>
            <span className="tag-badge">{post.category}</span>
            <span style={{ fontSize: "0.85rem", color: "var(--text-dim)", display: "flex", alignItems: "center" }}>
              • {post.readTime}
            </span>
          </div>

          <h1 className="article-title" style={{
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
              src={post.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"} 
              alt={post.author?.name || "Author"} 
              style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: "600" }}>{post.author?.name || "Thành Dương"}</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>
                {post.author?.role || "English Teacher"} • {post.date}
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="glass-panel article-cover" style={{
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
        <div className="glass-panel article-body" style={{
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
              {Array.isArray(post.tags) && post.tags.map(tag => (
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

            <ShareButton />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section style={{ maxWidth: "800px", margin: "4rem auto 0 auto" }}>
          <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem" }}>Bài học liên quan</h3>
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

      {/* Edit Modal */}
      <PostModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        postToEdit={post}
      />
    </div>
  );
}

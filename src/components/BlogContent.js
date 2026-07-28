"use client";

import { useState } from "react";
import Link from "next/link";
import { usePosts } from "@/context/PostContext";
import { useAuth } from "@/context/AuthContext";
import PostModal from "@/components/PostModal";

export default function BlogContent() {
  const { posts, categories, deletePost } = usePosts();
  const { isAdmin } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState({});

  // Admin Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenAddModal = () => {
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post, e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleDeletePost = (id, title, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`Bạn có chắc chắn muốn xóa bài học "${title}"?`)) {
      deletePost(id);
    }
  };

  // Filtering Logic
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.featured) || posts[0];

  return (
    <section id="articles" style={{ marginTop: "3rem" }}>
      {/* Search & Category Filter Header */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginBottom: "2.5rem"
      }}>
        {/* Search Bar & Admin Add Button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <div style={{
            position: "relative",
            flex: "1 1 300px",
            maxWidth: "600px"
          }}>
            <input 
              type="text" 
              placeholder="Tìm kiếm bài học theo từ khóa, tag (12 Thì, Present Simple, Shadowing, IELTS...)..."
              className="input-glass"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: "42px" }}
            />
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-dim)"
              }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          {isAdmin && (
            <button 
              onClick={handleOpenAddModal}
              className="btn-primary"
              style={{ padding: "10px 18px", fontSize: "0.9rem" }}
            >
              ✨ + Thêm bài học mới
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "8px"
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: "var(--radius-full)",
                fontSize: "0.88rem",
                fontWeight: "600",
                cursor: "pointer",
                border: "1px solid",
                borderColor: selectedCategory === cat ? "var(--accent-indigo)" : "var(--border-glass)",
                background: selectedCategory === cat ? "var(--gradient-primary)" : "rgba(255, 255, 255, 0.03)",
                color: selectedCategory === cat ? "#ffffff" : "var(--text-muted)",
                transition: "var(--transition-normal)",
                whiteSpace: "nowrap"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Post Card */}
      {selectedCategory === "All" && !searchQuery && featuredPost && (
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.8rem" }}>
            <span style={{ 
              fontSize: "0.8rem", 
              fontWeight: "700", 
              letterSpacing: "0.08em", 
              color: "var(--accent-cyan)",
              display: "block"
            }}>
              🌟 BÀI HỌC NỔI BẬT
            </span>

            {isAdmin && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button 
                  onClick={(e) => handleOpenEditModal(featuredPost, e)}
                  className="btn-secondary"
                  style={{ fontSize: "0.78rem", padding: "4px 10px" }}
                >
                  ✏️ Sửa
                </button>
                <button 
                  onClick={(e) => handleDeletePost(featuredPost.id, featuredPost.title, e)}
                  className="btn-secondary"
                  style={{ fontSize: "0.78rem", padding: "4px 10px", color: "#f87171", borderColor: "rgba(239,68,68,0.3)" }}
                >
                  🗑️ Xóa
                </button>
              </div>
            )}
          </div>

          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="glass-panel featured-grid" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              padding: "2rem",
              alignItems: "center"
            }}>
              <div className="featured-img-container" style={{
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                height: "260px",
                position: "relative"
              }}>
                <img 
                  src={featuredPost.coverImage} 
                  alt={featuredPost.title} 
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "var(--transition-normal)"
                  }}
                />
              </div>

              <div>
                <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <span className="tag-badge">{featuredPost.category}</span>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-dim)" }}>• {featuredPost.readTime}</span>
                </div>

                <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", lineHeight: "1.3" }}>
                  {featuredPost.title}
                </h2>

                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
                  {featuredPost.excerpt}
                </p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name}
                      style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }} 
                    />
                    <div>
                      <div style={{ fontSize: "0.85rem", fontWeight: "600" }}>{featuredPost.author.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>{featuredPost.date}</div>
                    </div>
                  </div>

                  <span style={{ 
                    color: "var(--accent-indigo)", 
                    fontWeight: "600", 
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    Đọc tiếp →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}

      {/* Grid of Articles */}
      <h3 style={{ fontSize: "1.3rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "8px" }}>
        <span>Tất cả bài học</span>
        <span style={{ fontSize: "0.9rem", color: "var(--text-dim)", fontWeight: "400" }}>
          ({filteredPosts.length})
        </span>
      </h3>

      {filteredPosts.length === 0 ? (
        <div className="glass-panel" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.1rem" }}>🔍 Không tìm thấy bài học nào phù hợp với từ khóa "{searchQuery}".</p>
        </div>
      ) : (
        <div className="posts-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1.75rem"
        }}>
          {filteredPosts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <div className="glass-panel animate-fade-in" style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}>
                <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                  <button 
                    onClick={(e) => toggleBookmark(post.id, e)}
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      background: "rgba(9, 13, 22, 0.7)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid var(--border-glass)",
                      borderRadius: "50%",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: bookmarks[post.id] ? "#ec4899" : "var(--text-muted)",
                      cursor: "pointer",
                      transition: "var(--transition-normal)"
                    }}
                  >
                    ♥
                  </button>

                  {isAdmin && (
                    <div style={{
                      position: "absolute",
                      bottom: "10px",
                      right: "10px",
                      display: "flex",
                      gap: "6px",
                      zIndex: 3
                    }}>
                      <button 
                        onClick={(e) => handleOpenEditModal(post, e)}
                        style={{
                          background: "rgba(9, 13, 22, 0.85)",
                          border: "1px solid var(--border-glass)",
                          borderRadius: "var(--radius-sm)",
                          padding: "4px 8px",
                          fontSize: "0.75rem",
                          color: "#ffffff",
                          cursor: "pointer"
                        }}
                      >
                        ✏️ Sửa
                      </button>
                      <button 
                        onClick={(e) => handleDeletePost(post.id, post.title, e)}
                        style={{
                          background: "rgba(239, 68, 68, 0.85)",
                          border: "1px solid rgba(239, 68, 68, 0.5)",
                          borderRadius: "var(--radius-sm)",
                          padding: "4px 8px",
                          fontSize: "0.75rem",
                          color: "#ffffff",
                          cursor: "pointer"
                        }}
                      >
                        🗑️ Xóa
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.75rem" }}>
                    <span className="tag-badge">{post.category}</span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>• {post.readTime}</span>
                  </div>

                  <h4 style={{ fontSize: "1.15rem", marginBottom: "0.75rem", lineHeight: "1.4", flex: "0 0 auto" }}>
                    {post.title}
                  </h4>

                  <p style={{ 
                    color: "var(--text-muted)", 
                    fontSize: "0.88rem", 
                    marginBottom: "1.25rem",
                    display: "-webkit-box",
                    WebkitLineClamp: "3",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    flex: "1 0 auto"
                  }}>
                    {post.excerpt}
                  </p>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "auto",
                    paddingTop: "1rem",
                    borderTop: "1px solid var(--border-glass)"
                  }}>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>{post.date}</span>
                    <span style={{ fontSize: "0.82rem", color: "var(--accent-indigo)", fontWeight: "600" }}>Đọc bài →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Admin Post Create/Edit Modal */}
      <PostModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        postToEdit={editingPost}
      />
    </section>
  );
}

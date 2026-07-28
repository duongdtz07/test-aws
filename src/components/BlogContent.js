"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS, CATEGORIES } from "@/data/posts";

export default function BlogContent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState({});

  const toggleBookmark = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarks(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtering Logic
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS.find(p => p.featured) || BLOG_POSTS[0];

  return (
    <section id="articles" style={{ marginTop: "3rem" }}>
      {/* Search & Category Filter Header */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginBottom: "2.5rem"
      }}>
        {/* Search Bar */}
        <div style={{
          position: "relative",
          maxWidth: "600px"
        }}>
          <input 
            type="text" 
            placeholder="Tìm kiếm bài viết theo từ khóa, tag (Next.js, AWS, Docker...)..."
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

        {/* Category Pills */}
        <div style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "8px"
        }}>
          {CATEGORIES.map(cat => (
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

      {/* Featured Post Card (When not searching and on 'All' category) */}
      {selectedCategory === "All" && !searchQuery && featuredPost && (
        <div style={{ marginBottom: "3rem" }}>
          <span style={{ 
            fontSize: "0.8rem", 
            fontWeight: "700", 
            letterSpacing: "0.08em", 
            color: "var(--accent-cyan)",
            display: "block",
            marginBottom: "0.8rem"
          }}>
            🌟 BÀI VIẾT NỔI BẬT
          </span>

          <Link href={`/blog/${featuredPost.slug}`}>
            <div className="glass-panel" style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
              padding: "2rem",
              alignItems: "center"
            }}>
              <div style={{
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
        <span>Tất cả bài viết</span>
        <span style={{ fontSize: "0.9rem", color: "var(--text-dim)", fontWeight: "400" }}>
          ({filteredPosts.length})
        </span>
      </h3>

      {filteredPosts.length === 0 ? (
        <div className="glass-panel" style={{ padding: "3rem", textAlign: "center", color: "var(--text-muted)" }}>
          <p style={{ fontSize: "1.1rem" }}>🔍 Không tìm thấy bài viết nào phù hợp với từ khóa "{searchQuery}".</p>
        </div>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
    </section>
  );
}

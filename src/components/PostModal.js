"use client";

import { useState, useEffect } from "react";
import { usePosts } from "@/context/PostContext";

export default function PostModal({ isOpen, onClose, postToEdit = null }) {
  const { addPost, updatePost, categories } = usePosts();

  const [formData, setFormData] = useState({
    title: "",
    category: "Ngữ pháp (Grammar)",
    excerpt: "",
    coverImage: "",
    readTime: "5 phút đọc",
    tags: "",
    authorName: "Thành Dương",
    authorRole: "English Teacher",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    featured: false,
    content: ""
  });

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        title: postToEdit.title || "",
        category: postToEdit.category || "Ngữ pháp (Grammar)",
        excerpt: postToEdit.excerpt || "",
        coverImage: postToEdit.coverImage || "",
        readTime: postToEdit.readTime || "5 phút đọc",
        tags: Array.isArray(postToEdit.tags) ? postToEdit.tags.join(", ") : postToEdit.tags || "",
        authorName: postToEdit.author?.name || "Thành Dương",
        authorRole: postToEdit.author?.role || "English Teacher",
        authorAvatar: postToEdit.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        featured: postToEdit.featured || false,
        content: postToEdit.content || ""
      });
    } else {
      setFormData({
        title: "",
        category: "Ngữ pháp (Grammar)",
        excerpt: "",
        coverImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80",
        readTime: "5 phút đọc",
        tags: "Ngữ pháp, 12 Thì",
        authorName: "Thành Dương",
        authorRole: "English Teacher",
        authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        featured: false,
        content: ""
      });
    }
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    if (postToEdit) {
      updatePost(postToEdit.id, formData);
    } else {
      addPost(formData);
    }
    onClose();
  };

  const availableCategories = categories.filter(c => c !== "All");

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      background: "rgba(0, 0, 0, 0.75)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem 1rem"
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: "100%",
        maxWidth: "680px",
        maxHeight: "90vh",
        overflowY: "auto",
        padding: "2rem",
        position: "relative",
        background: "rgba(17, 24, 39, 0.95)",
        border: "1px solid var(--border-glass-bright)"
      }}>
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "1.25rem",
            cursor: "pointer"
          }}
        >
          ✕
        </button>

        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>
          {postToEdit ? "✏️ Chỉnh sửa bài học" : "📝 Thêm bài học mới"}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              Tiêu đề bài học *
            </label>
            <input 
              type="text"
              name="title"
              className="input-glass"
              placeholder="Ví dụ: Thì Tương Lai Đơn: Cấu Trúc & Ví Dụ..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
                Danh mục *
              </label>
              <select
                name="category"
                className="input-glass"
                value={formData.category}
                onChange={handleChange}
                style={{ cursor: "pointer" }}
              >
                {availableCategories.map(cat => (
                  <option key={cat} value={cat} style={{ background: "#111827", color: "#fff" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
                Thời gian đọc
              </label>
              <input 
                type="text"
                name="readTime"
                className="input-glass"
                placeholder="5 phút đọc"
                value={formData.readTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              Trích dẫn ngắn (Excerpt) *
            </label>
            <textarea 
              name="excerpt"
              className="input-glass"
              rows="2"
              placeholder="Tóm tắt ngắn gọn nội dung chính bài học..."
              value={formData.excerpt}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              URL Ảnh bìa (Cover Image)
            </label>
            <input 
              type="url"
              name="coverImage"
              className="input-glass"
              placeholder="https://images.unsplash.com/..."
              value={formData.coverImage}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              Thẻ Tags (phân cách bằng dấu phẩy)
            </label>
            <input 
              type="text"
              name="tags"
              className="input-glass"
              placeholder="Ngữ pháp, 12 Thì, Present Simple"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              Nội dung bài học * (Hỗ trợ Markdown)
            </label>
            <textarea 
              name="content"
              className="input-glass"
              rows="8"
              placeholder="Chi tiết bài học, công thức, ví dụ..."
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <input 
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ width: "18px", height: "18px", cursor: "pointer" }}
            />
            <label htmlFor="featured" style={{ fontSize: "0.9rem", fontWeight: "500", cursor: "pointer" }}>
              Đặt làm Bài học Nổi bật (Featured Post)
            </label>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Hủy
            </button>
            <button type="submit" className="btn-primary">
              {postToEdit ? "Lưu thay đổi" : "Tạo bài học"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const res = login(username, password);
    if (res.success) {
      setUsername("");
      setPassword("");
      onClose();
    } else {
      setError(res.error);
    }
  };

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
      padding: "1rem"
    }}>
      <div className="glass-panel animate-fade-in" style={{
        width: "100%",
        maxWidth: "420px",
        padding: "2.5rem 2rem",
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

        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "var(--gradient-primary)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            marginBottom: "0.75rem"
          }}>
            🔐
          </div>
          <h2 style={{ fontSize: "1.5rem" }}>Đăng nhập Admin</h2>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Quản trị bài học & nội dung EngLog
          </p>
        </div>

        {error && (
          <div style={{
            background: "rgba(239, 68, 68, 0.15)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            color: "#f87171",
            padding: "8px 14px",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.85rem",
            marginBottom: "1.25rem",
            textAlign: "center"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              Tên tài khoản
            </label>
            <input 
              type="text"
              className="input-glass"
              placeholder="Nhập 'admin'"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px" }}>
              Mật khẩu
            </label>
            <input 
              type="password"
              className="input-glass"
              placeholder="Nhập 'admin123'"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{
            fontSize: "0.78rem",
            color: "var(--text-dim)",
            background: "rgba(255, 255, 255, 0.03)",
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--border-glass)"
          }}>
            💡 Tài khoản mặc định: <b>admin</b> / Mật khẩu: <b>admin123</b>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "0.5rem" }}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}

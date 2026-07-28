"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "@/components/LoginModal";

export default function Navbar() {
  const { isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(9, 13, 22, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border-glass)",
        padding: "0.85rem 0"
      }}>
        <div className="container" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          {/* Brand Logo */}
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none"
          }}>
            <div style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "var(--gradient-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "1.2rem",
              color: "#ffffff",
              boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)"
            }}>
              E
            </div>
            <span style={{
              fontFamily: "var(--font-heading)",
              fontSize: "1.4rem",
              fontWeight: "800",
              letterSpacing: "-0.02em"
            }}>
              Eng<span className="gradient-text">Log</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem"
          }}>
            <Link href="/" style={{
              fontSize: "0.95rem",
              fontWeight: "500",
              color: "var(--text-main)",
              transition: "var(--transition-normal)"
            }}>
              Trang chủ
            </Link>
            <Link href="/#articles" style={{
              fontSize: "0.95rem",
              fontWeight: "500",
              color: "var(--text-muted)",
              transition: "var(--transition-normal)"
            }}>
              Bài học
            </Link>
            <Link href="/#newsletter" style={{
              fontSize: "0.95rem",
              fontWeight: "500",
              color: "var(--text-muted)",
              transition: "var(--transition-normal)"
            }}>
              Newsletter
            </Link>
          </nav>

          {/* Desktop Action & Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {isAdmin ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="tag-badge" style={{ background: "rgba(16, 185, 129, 0.15)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>
                  👑 Admin Mode
                </span>
                <button 
                  onClick={logout}
                  className="btn-secondary"
                  style={{ fontSize: "0.82rem", padding: "6px 12px" }}
                >
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="btn-secondary"
                style={{ fontSize: "0.85rem", padding: "8px 16px" }}
              >
                🔑 Admin Login
              </button>
            )}

            <a 
              href="https://github.com/duongdtz07/test-aws" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary desktop-btn"
              style={{ fontSize: "0.85rem", padding: "8px 14px" }}
            >
              GitHub
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-toggle"
              aria-label="Toggle Navigation Menu"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-glass)",
                borderRadius: "var(--radius-sm)",
                padding: "8px",
                color: "var(--text-main)",
                cursor: "pointer",
                display: "none",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <nav className="mobile-menu animate-fade-in" style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1.25rem 1.5rem",
            background: "rgba(17, 24, 39, 0.95)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border-glass)",
            marginTop: "0.85rem"
          }}>
            <Link 
              href="/" 
              onClick={() => setIsOpen(false)} 
              style={{ fontSize: "1rem", fontWeight: "600", color: "var(--text-main)" }}
            >
              Trang chủ
            </Link>
            <Link 
              href="/#articles" 
              onClick={() => setIsOpen(false)} 
              style={{ fontSize: "1rem", fontWeight: "500", color: "var(--text-muted)" }}
            >
              Bài học
            </Link>
            <Link 
              href="/#newsletter" 
              onClick={() => setIsOpen(false)} 
              style={{ fontSize: "1rem", fontWeight: "500", color: "var(--text-muted)" }}
            >
              Newsletter
            </Link>

            {isAdmin ? (
              <button 
                onClick={() => { logout(); setIsOpen(false); }}
                className="btn-secondary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                👑 Đăng xuất Admin
              </button>
            ) : (
              <button 
                onClick={() => { setIsLoginOpen(true); setIsOpen(false); }}
                className="btn-primary"
                style={{ width: "100%", justifyContent: "center" }}
              >
                🔑 Đăng nhập Admin
              </button>
            )}
          </nav>
        )}
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </>
  );
}

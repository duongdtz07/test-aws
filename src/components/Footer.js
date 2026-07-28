export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border-glass)",
      padding: "3rem 0",
      marginTop: "5rem",
      background: "rgba(9, 13, 22, 0.9)"
    }}>
      <div className="container" style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        textAlign: "center"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontFamily: "var(--font-heading)",
          fontSize: "1.3rem",
          fontWeight: "800"
        }}>
          Dev<span className="gradient-text">Log</span>
        </div>

        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "500px" }}>
          Chia sẻ kiến thức Lập trình, DevOps, Cloud Architecture và AI từ những trải nghiệm thực tế.
        </p>

        <div style={{
          display: "flex",
          gap: "1.5rem",
          fontSize: "0.85rem",
          color: "var(--text-dim)"
        }}>
          <span>© 2026 DevLog. Built with Next.js App Router.</span>
        </div>
      </div>
    </footer>
  );
}

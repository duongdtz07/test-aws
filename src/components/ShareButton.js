"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      className="btn-secondary" 
      style={{ fontSize: "0.82rem", padding: "6px 14px" }}
      onClick={handleShare}
    >
      {copied ? "✓ Đã sao chép!" : "🔗 Chia sẻ bài viết"}
    </button>
  );
}

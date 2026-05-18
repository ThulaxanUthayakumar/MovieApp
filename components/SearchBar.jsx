import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => onSearch(input), 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div style={{ position: "relative", maxWidth: "600px", margin: "0 auto" }}>
      <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", fontSize: "16px" }}>🔍</span>
      <input
        type="text"
        placeholder="Search movies... e.g. Inception, Batman"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          width: "100%", padding: "14px 44px",
          fontSize: "15px", background: "#1a1a1a",
          border: "1px solid #333", borderRadius: "12px",
          color: "#fff", outline: "none",
          fontFamily: "system-ui, sans-serif",
          boxSizing: "border-box",
        }}
      />
      {input && (
        <button
          onClick={() => setInput("")}
          style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#666", cursor: "pointer", fontSize: "16px" }}
        >✕</button>
      )}
    </div>
  );
}
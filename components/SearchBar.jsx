import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  // Debounce — search fires 500ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(input);
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <div style={styles.wrapper}>
      <span style={styles.icon}>🔍</span>
      <input
        type="text"
        placeholder="Search movies..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={styles.input}
      />
      {input && (
        <button onClick={() => setInput("")} style={styles.clear}>✕</button>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    left: "16px",
    fontSize: "16px",
  },
  input: {
    width: "100%",
    padding: "14px 48px",
    fontSize: "16px",
    background: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "12px",
    color: "#fff",
    outline: "none",
  },
  clear: {
    position: "absolute",
    right: "14px",
    background: "none",
    border: "none",
    color: "#666",
    cursor: "pointer",
    fontSize: "16px",
  },
};
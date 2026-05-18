import { useState, useEffect } from "react";

export default function MovieFormModal({ movie, onSave, onClose }) {
  const isEdit = !!movie;
  const [form, setForm] = useState({ Title: "", Year: "", Genre: "", Director: "", Plot: "", imdbRating: "" });

  useEffect(() => {
    if (movie) setForm({ Title: movie.Title || "", Year: movie.Year || "", Genre: movie.Genre || "", Director: movie.Director || "", Plot: movie.Plot || "", imdbRating: movie.imdbRating || "" });
  }, [movie]);

  function handleSubmit() {
    if (!form.Title.trim()) return alert("Title is required");
    onSave(form);
    onClose();
  }

  return (
    <div onClick={onClose} style={s.overlay}>
      <div onClick={(e) => e.stopPropagation()} style={s.modal}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#fff", margin: 0 }}>
            {isEdit ? "Edit Movie" : "Add Custom Movie"}
          </h2>
          <button onClick={onClose} style={s.closeBtn}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={s.label}>Title *</label>
            <input style={s.input} value={form.Title} onChange={(e) => setForm({ ...form, Title: e.target.value })} placeholder="Movie title" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={s.label}>Year</label>
              <input style={s.input} value={form.Year} onChange={(e) => setForm({ ...form, Year: e.target.value })} placeholder="2024" />
            </div>
            <div>
              <label style={s.label}>IMDb Rating</label>
              <input style={s.input} value={form.imdbRating} onChange={(e) => setForm({ ...form, imdbRating: e.target.value })} placeholder="7.5" />
            </div>
          </div>
          <div>
            <label style={s.label}>Genre</label>
            <input style={s.input} value={form.Genre} onChange={(e) => setForm({ ...form, Genre: e.target.value })} placeholder="Action, Drama" />
          </div>
          <div>
            <label style={s.label}>Director</label>
            <input style={s.input} value={form.Director} onChange={(e) => setForm({ ...form, Director: e.target.value })} placeholder="Director name" />
          </div>
          <div>
            <label style={s.label}>Plot</label>
            <textarea style={{ ...s.input, resize: "vertical" }} rows={3} value={form.Plot} onChange={(e) => setForm({ ...form, Plot: e.target.value })} placeholder="Short description..." />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "22px" }}>
          <button onClick={onClose} style={s.cancelBtn}>Cancel</button>
          <button onClick={handleSubmit} style={s.saveBtn}>{isEdit ? "Save Changes" : "Add Movie"}</button>
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: "20px" },
  modal: { background: "#111", borderRadius: "16px", border: "1px solid #222", padding: "28px", width: "100%", maxWidth: "480px", maxHeight: "90vh", overflowY: "auto" },
  closeBtn: { background: "#222", border: "none", color: "#fff", borderRadius: "50%", width: "30px", height: "30px", cursor: "pointer", fontSize: "14px" },
  label: { fontSize: "11px", fontWeight: "700", color: "#666", textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "5px" },
  input: { width: "100%", padding: "9px 12px", fontSize: "14px", borderRadius: "8px", border: "1px solid #333", background: "#1a1a1a", color: "#fff", outline: "none", fontFamily: "system-ui, sans-serif", boxSizing: "border-box" },
  cancelBtn: { flex: 1, padding: "11px", borderRadius: "10px", background: "#1a1a1a", border: "1px solid #333", color: "#aaa", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  saveBtn: { flex: 1, padding: "11px", borderRadius: "10px", background: "#e50914", border: "none", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" },
};
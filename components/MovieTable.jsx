export default function MovieTable({ movies, onEdit, onDelete }) {
  if (!movies.length) {
    return (
      <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>
        <p style={{ fontSize: "40px" }}>🎬</p>
        <p style={{ marginTop: "12px", fontSize: "16px" }}>No movies saved yet</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #222" }}>
            {["Title", "Year", "Genre", "Rating", "Actions"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "12px 16px", fontSize: "11px", fontWeight: "700", color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, i) => (
            <tr
              key={movie.imdbID}
              style={{ borderBottom: i < movies.length - 1 ? "1px solid #1a1a1a" : "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#111")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {movie.Poster !== "N/A"
                    ? <img src={movie.Poster} alt={movie.Title} style={{ width: "32px", height: "46px", objectFit: "cover", borderRadius: "4px" }} />
                    : <div style={{ width: "32px", height: "46px", background: "#1a1a1a", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center" }}>🎬</div>
                  }
                  <span style={{ color: "#fff", fontWeight: "600" }}>{movie.Title}</span>
                  {movie.isCustom && (
                    <span style={{ fontSize: "10px", background: "#1a3a1a", color: "#4caf50", padding: "2px 7px", borderRadius: "4px", fontWeight: "700" }}>Custom</span>
                  )}
                </div>
              </td>
              <td style={{ padding: "14px 16px", color: "#888" }}>{movie.Year || "—"}</td>
              <td style={{ padding: "14px 16px", color: "#888" }}>{movie.Genre ? movie.Genre.split(",")[0].trim() : "—"}</td>
              <td style={{ padding: "14px 16px", color: "#f5c518" }}>
                {movie.imdbRating && movie.imdbRating !== "N/A" ? `⭐ ${movie.imdbRating}` : "—"}
              </td>
              <td style={{ padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => onEdit(movie)} style={{ padding: "6px 14px", borderRadius: "7px", background: "#1a1a1a", border: "1px solid #333", color: "#fff", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    ✏️ Edit
                  </button>
                  <button onClick={() => onDelete(movie.imdbID)} style={{ padding: "6px 14px", borderRadius: "7px", background: "#2a0a0a", border: "1px solid #5a1a1a", color: "#e50914", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
                    🗑 Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
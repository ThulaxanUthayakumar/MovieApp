import { useEffect, useState } from "react";
import { getMovieById } from "@/lib/api";

export default function MovieModal({ movie, onClose, onWatchlist, isInWatchlist }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;
    setDetail(null);
    setLoading(true);
    getMovieById(movie.imdbID).then((data) => {
      setDetail(data);
      setLoading(false);
    });
  }, [movie]);

  if (!movie) return null;
  const inList = isInWatchlist(movie.imdbID);

  return (
    <div onClick={onClose} style={s.overlay}>
      <div onClick={(e) => e.stopPropagation()} style={s.modal}>
        <button onClick={onClose} style={s.closeBtn}>✕</button>
        {loading ? (
          <p style={{ color: "#666", padding: "60px", textAlign: "center" }}>Loading...</p>
        ) : detail ? (
          <div style={s.content}>
            <div style={s.top}>
              {detail.Poster !== "N/A"
                ? <img src={detail.Poster} alt={detail.Title} style={s.poster} />
                : <div style={s.noPoster}>🎬</div>
              }
              <div style={{ flex: 1 }}>
                <h2 style={s.title}>{detail.Title}</h2>
                <div style={s.tags}>
                  <span style={s.tag}>{detail.Year}</span>
                  {detail.Rated !== "N/A" && <span style={s.tag}>{detail.Rated}</span>}
                  {detail.Runtime !== "N/A" && <span style={s.tag}>{detail.Runtime}</span>}
                  {detail.Genre && <span style={s.tag}>{detail.Genre.split(",")[0]}</span>}
                </div>
                {detail.imdbRating !== "N/A" && (
                  <p style={s.rating}>⭐ <strong>{detail.imdbRating}</strong> / 10</p>
                )}
                <p style={s.plot}>{detail.Plot}</p>
                {detail.Director !== "N/A" && <p style={s.crew}><strong>Director:</strong> {detail.Director}</p>}
                {detail.Actors !== "N/A" && <p style={s.crew}><strong>Cast:</strong> {detail.Actors}</p>}
                <button
                  onClick={() => inList ? onWatchlist.remove(movie.imdbID) : onWatchlist.add(movie)}
                  style={{ ...s.wlBtn, background: inList ? "#1a1a1a" : "#e50914" }}
                >
                  {inList ? "✕ Remove from Watchlist" : "❤️ Add to Watchlist"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: "#666", padding: "40px" }}>Could not load details.</p>
        )}
      </div>
    </div>
  );
}

const s = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" },
  modal: { background: "#111", borderRadius: "16px", maxWidth: "760px", width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative", border: "1px solid #222" },
  closeBtn: { position: "absolute", top: "14px", right: "14px", background: "#222", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer", borderRadius: "50%", width: "32px", height: "32px", zIndex: 10 },
  content: { padding: "28px" },
  top: { display: "flex", gap: "24px", flexWrap: "wrap" },
  poster: { width: "180px", height: "260px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 },
  noPoster: { width: "180px", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", borderRadius: "10px", fontSize: "48px", flexShrink: 0 },
  title: { fontSize: "22px", fontWeight: "800", color: "#fff", margin: "0 0 12px" },
  tags: { display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" },
  tag: { background: "#222", color: "#aaa", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px", border: "1px solid #333" },
  rating: { fontSize: "16px", color: "#f5c518", marginBottom: "12px" },
  plot: { fontSize: "14px", color: "#ccc", lineHeight: "1.6", marginBottom: "14px" },
  crew: { fontSize: "13px", color: "#888", marginBottom: "6px" },
  wlBtn: { marginTop: "16px", padding: "11px 22px", border: "none", borderRadius: "10px", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", width: "100%" },
};
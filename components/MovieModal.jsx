import { useEffect, useState } from "react";
import { getMovieById } from "@/lib/api";

export default function MovieModal({ movie, onClose, onWatchlist, isInWatchlist }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movie) return;
    setLoading(true);
    getMovieById(movie.imdbID).then((data) => {
      setDetail(data);
      setLoading(false);
    });
  }, [movie]);

  if (!movie) return null;

  const inList = isInWatchlist(movie.imdbID);

  return (
    <div onClick={onClose} style={styles.overlay}>
      <div onClick={(e) => e.stopPropagation()} style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>

        {loading ? (
          <p style={{ color: "#666", padding: "40px", textAlign: "center" }}>Loading...</p>
        ) : detail ? (
          <div style={styles.content}>
            <div style={styles.top}>
              <img
                src={detail.Poster !== "N/A" ? detail.Poster : "/no-poster.png"}
                alt={detail.Title}
                style={styles.poster}
              />
              <div style={styles.meta}>
                <h2 style={styles.title}>{detail.Title}</h2>
                <div style={styles.tags}>
                  <span style={styles.tag}>{detail.Year}</span>
                  <span style={styles.tag}>{detail.Rated}</span>
                  <span style={styles.tag}>{detail.Runtime}</span>
                </div>
                <p style={styles.genre}>{detail.Genre}</p>
                <div style={styles.rating}>
                  ⭐ <strong>{detail.imdbRating}</strong> / 10
                  <span style={styles.votes}>({detail.imdbVotes} votes)</span>
                </div>
                <p style={styles.plot}>{detail.Plot}</p>
                <p style={styles.crew}><strong>Director:</strong> {detail.Director}</p>
                <p style={styles.crew}><strong>Cast:</strong> {detail.Actors}</p>
                <button
                  onClick={() => inList ? onWatchlist.remove(movie.imdbID) : onWatchlist.add(movie)}
                  style={{
                    ...styles.watchlistBtn,
                    background: inList ? "#333" : "#e50914",
                  }}
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

const styles = {
  overlay: {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 100, padding: "20px",
  },
  modal: {
    background: "#111", borderRadius: "16px",
    maxWidth: "760px", width: "100%",
    maxHeight: "90vh", overflowY: "auto",
    position: "relative", border: "1px solid #222",
  },
  closeBtn: {
    position: "absolute", top: "14px", right: "14px",
    background: "#222", border: "none", color: "#fff",
    fontSize: "16px", cursor: "pointer", borderRadius: "50%",
    width: "32px", height: "32px", zIndex: 10,
  },
  content: { padding: "28px" },
  top: { display: "flex", gap: "24px" },
  poster: { width: "180px", height: "260px", objectFit: "cover", borderRadius: "10px", flexShrink: 0 },
  meta: { flex: 1 },
  title: { fontSize: "22px", fontWeight: "800", color: "#fff", margin: "0 0 12px" },
  tags: { display: "flex", gap: "8px", marginBottom: "10px", flexWrap: "wrap" },
  tag: { background: "#222", color: "#aaa", fontSize: "11px", fontWeight: "600", padding: "4px 10px", borderRadius: "20px", border: "1px solid #333" },
  genre: { fontSize: "13px", color: "#888", marginBottom: "10px" },
  rating: { fontSize: "16px", color: "#f5c518", marginBottom: "12px", display: "flex", alignItems: "center", gap: "6px" },
  votes: { fontSize: "12px", color: "#666" },
  plot: { fontSize: "14px", color: "#ccc", lineHeight: "1.6", marginBottom: "14px" },
  crew: { fontSize: "13px", color: "#888", marginBottom: "6px" },
  watchlistBtn: {
    marginTop: "16px", padding: "11px 22px", border: "none",
    borderRadius: "10px", color: "#fff", fontSize: "14px",
    fontWeight: "700", cursor: "pointer", width: "100%",
  },
};
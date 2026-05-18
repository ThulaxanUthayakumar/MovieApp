export default function MovieCard({ movie, onSelect, onWatchlist, inWatchlist }) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : null;

  return (
    <div style={s.card}>
      <div onClick={() => onSelect(movie)} style={s.imgWrap}>
        {poster
          ? <img src={poster} alt={movie.Title} style={s.img} />
          : <div style={s.noPoster}>🎬</div>
        }
        <div style={s.overlay}>
          <span style={s.viewBtn}>View Details</span>
        </div>
      </div>
      <div style={s.info}>
        <p style={s.title}>{movie.Title}</p>
        <div style={s.bottom}>
          <span style={s.year}>{movie.Year}</span>
          <button
            onClick={() => onWatchlist(movie)}
            style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer" }}
          >
            {inWatchlist ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  card: { background: "#111", borderRadius: "12px", overflow: "hidden", border: "1px solid #1a1a1a" },
  imgWrap: { position: "relative", cursor: "pointer", overflow: "hidden" },
  img: { width: "100%", height: "280px", objectFit: "cover", display: "block" },
  noPoster: { width: "100%", height: "280px", display: "flex", alignItems: "center", justifyContent: "center", background: "#1a1a1a", fontSize: "48px" },
  overlay: { position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" },
  viewBtn: { background: "#e50914", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontWeight: "700", fontSize: "13px" },
  info: { padding: "12px 14px" },
  title: { fontSize: "14px", fontWeight: "600", color: "#f1f1f1", margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  bottom: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  year: { fontSize: "12px", color: "#666" },
};
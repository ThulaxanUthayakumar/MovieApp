export default function MovieCard({ movie, onSelect, onWatchlist, inWatchlist }) {
  const poster = movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png";

  return (
    <div style={styles.card}>
      <div onClick={() => onSelect(movie)} style={styles.imageWrapper}>
        <img src={poster} alt={movie.Title} style={styles.image} />
        <div style={styles.overlay}>
          <span style={styles.viewBtn}>View Details</span>
        </div>
      </div>
      <div style={styles.info}>
        <p style={styles.title}>{movie.Title}</p>
        <div style={styles.bottom}>
          <span style={styles.year}>{movie.Year}</span>
          <button
            onClick={() => onWatchlist(movie)}
            style={{
              ...styles.heartBtn,
              color: inWatchlist ? "#e50914" : "#555",
            }}
          >
            {inWatchlist ? "❤️" : "🤍"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#111",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid #222",
    transition: "transform 0.2s",
  },
  imageWrapper: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "280px",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    transition: "opacity 0.2s",
  },
  viewBtn: {
    background: "#e50914",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "13px",
  },
  info: {
    padding: "12px 14px",
  },
  title: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#f1f1f1",
    margin: "0 0 8px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  bottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  year: {
    fontSize: "12px",
    color: "#666",
  },
  heartBtn: {
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
};
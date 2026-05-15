import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, loading, error, onSelect, onWatchlist, isInWatchlist }) {
  if (loading) return <p style={styles.msg}>Loading movies...</p>;
  if (error) return <p style={{ ...styles.msg, color: "#e50914" }}>{error}</p>;
  if (movies.length === 0) return null;

  return (
    <div style={styles.grid}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.imdbID}
          movie={movie}
          onSelect={onSelect}
          onWatchlist={(m) =>
            isInWatchlist(m.imdbID) ? onWatchlist.remove(m.imdbID) : onWatchlist.add(m)
          }
          inWatchlist={isInWatchlist(movie.imdbID)}
        />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "20px",
    marginTop: "32px",
  },
  msg: {
    textAlign: "center",
    marginTop: "80px",
    color: "#666",
    fontSize: "16px",
  },
};
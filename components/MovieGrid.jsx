import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, loading, error, onSelect, onWatchlist, isInWatchlist }) {
  if (loading) return <p style={s.msg}>Loading movies...</p>;
  if (error) return <p style={{ ...s.msg, color: "#e50914" }}>{error}</p>;
  if (!movies.length) return null;

  return (
    <div style={s.grid}>
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

const s = {
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px", marginTop: "32px" },
  msg: { textAlign: "center", marginTop: "80px", color: "#666", fontSize: "16px" },
};
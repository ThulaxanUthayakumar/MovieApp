"use client";
import Navbar from "@/components/Navbar";
import MovieCard from "@/components/MovieCard";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useState } from "react";
import MovieModal from "@/components/MovieModal";

export default function WatchlistPage() {
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "system-ui, sans-serif" }}>
      <Navbar watchlistCount={watchlist.length} />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: "800", marginBottom: "8px" }}>My Watchlist</h1>
        <p style={{ color: "#666", marginBottom: "32px" }}>{watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved</p>

        {watchlist.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "80px", color: "#444" }}>
            <p style={{ fontSize: "48px" }}>🎬</p>
            <p style={{ fontSize: "18px", marginTop: "12px" }}>Your watchlist is empty</p>
            <p style={{ fontSize: "14px", marginTop: "6px" }}>Go search for movies and add them here</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
            {watchlist.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onSelect={setSelected}
                onWatchlist={() => removeFromWatchlist(movie.imdbID)}
                inWatchlist={true}
              />
            ))}
          </div>
        )}
      </main>
      <MovieModal
        movie={selected}
        onClose={() => setSelected(null)}
        onWatchlist={{ add: addToWatchlist, remove: removeFromWatchlist }}
        isInWatchlist={isInWatchlist}
      />
    </div>
  );
}
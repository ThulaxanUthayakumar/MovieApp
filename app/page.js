"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import MovieGrid from "@/components/MovieGrid";
import MovieModal from "@/components/MovieModal";
import { useMovies } from "@/hooks/useMovies";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function Home() {
  const { movies, loading, error, handleSearch } = useMovies();
  const { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <Navbar watchlistCount={watchlist.length} />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h1 style={{ fontSize: "38px", fontWeight: "800", margin: "0 0 10px", letterSpacing: "-0.03em", color: "#fff" }}>
            Find Your Next Movie
          </h1>
          <p style={{ color: "#666", marginBottom: "28px", fontSize: "16px" }}>
            Search millions of movies and build your watchlist
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
        <MovieGrid
          movies={movies}
          loading={loading}
          error={error}
          onSelect={setSelected}
          onWatchlist={{ add: addToWatchlist, remove: removeFromWatchlist }}
          isInWatchlist={isInWatchlist}
        />
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
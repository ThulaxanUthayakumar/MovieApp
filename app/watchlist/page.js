"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import MovieTable from "@/components/MovieTable";
import MovieFormModal from "@/components/MovieFormModal";
import { useWatchlist } from "@/hooks/useWatchlist";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, updateMovie, addCustomMovie } = useWatchlist();
  const [editMovie, setEditMovie] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  function handleDelete(imdbID) {
    if (confirm("Remove this movie?")) removeFromWatchlist(imdbID);
  }

  function handleSaveEdit(changes) {
    updateMovie(editMovie.imdbID, changes);
    setEditMovie(null);
  }

  const avgRating = (() => {
    const rated = watchlist.filter((m) => m.imdbRating && m.imdbRating !== "N/A");
    if (!rated.length) return "—";
    return (rated.reduce((s, m) => s + parseFloat(m.imdbRating), 0) / rated.length).toFixed(1);
  })();

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      <Navbar watchlistCount={watchlist.length} />
      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 20px" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "0 0 4px", color: "#fff" }}>My Watchlist</h1>
            <p style={{ color: "#555", fontSize: "14px", margin: 0 }}>{watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            style={{ padding: "10px 20px", background: "#e50914", border: "none", borderRadius: "10px", color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
          >
            + Add Custom Movie
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "28px" }}>
          {[
            { label: "Total Saved", value: watchlist.length },
            { label: "Custom Added", value: watchlist.filter((m) => m.isCustom).length },
            { label: "Avg Rating", value: avgRating },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: "#111", border: "1px solid #1a1a1a", borderRadius: "12px", padding: "16px 20px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>{label}</div>
              <div style={{ fontSize: "26px", fontWeight: "800", color: "#fff" }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: "#0d0d0d", border: "1px solid #1a1a1a", borderRadius: "14px", overflow: "hidden" }}>
          <MovieTable movies={watchlist} onEdit={setEditMovie} onDelete={handleDelete} />
        </div>
      </main>

      {editMovie && <MovieFormModal movie={editMovie} onSave={handleSaveEdit} onClose={() => setEditMovie(null)} />}
      {showAdd && <MovieFormModal movie={null} onSave={(data) => { addCustomMovie(data); setShowAdd(false); }} onClose={() => setShowAdd(false)} />}
    </div>
  );
}
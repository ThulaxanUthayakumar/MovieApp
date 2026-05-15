import { useState, useEffect } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  function addToWatchlist(movie) {
    const updated = [...watchlist, movie];
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  function removeFromWatchlist(imdbID) {
    const updated = watchlist.filter((m) => m.imdbID !== imdbID);
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  function isInWatchlist(imdbID) {
    return watchlist.some((m) => m.imdbID === imdbID);
  }

  return { watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist };
}
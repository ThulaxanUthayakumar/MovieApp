import { useState, useEffect } from "react";

export function useWatchlist() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);

  function save(updated) {
    setWatchlist(updated);
    localStorage.setItem("watchlist", JSON.stringify(updated));
  }

  function addToWatchlist(movie) {
    if (watchlist.some((m) => m.imdbID === movie.imdbID)) return;
    save([...watchlist, movie]);
  }

  function removeFromWatchlist(imdbID) {
    save(watchlist.filter((m) => m.imdbID !== imdbID));
  }

  function updateMovie(imdbID, changes) {
    save(watchlist.map((m) => (m.imdbID === imdbID ? { ...m, ...changes } : m)));
  }

  function addCustomMovie(data) {
    const movie = {
      ...data,
      imdbID: "custom_" + Date.now(),
      Poster: "N/A",
      isCustom: true,
    };
    save([...watchlist, movie]);
  }

  function isInWatchlist(imdbID) {
    return watchlist.some((m) => m.imdbID === imdbID);
  }

  return {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    updateMovie,
    addCustomMovie,
    isInWatchlist,
  };
}
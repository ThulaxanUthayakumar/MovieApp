import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "@/lib/api";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPopular();
  }, []);

  async function loadPopular() {
    setLoading(true);
    setError(null);
    try {
      const data = await getPopularMovies();
      setMovies(data);
    } catch {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      loadPopular();
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await searchMovies(query);
      if (!data.length) {
        setError(`No results found for "${query}"`);
        setMovies([]);
      } else {
        setMovies(data);
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, handleSearch };
}
import { useState, useEffect, useCallback } from "react";
import { searchMovies, getPopularMovies } from "@/lib/api";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

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

  // Debounced search — waits 500ms after user stops typing
  const handleSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      loadPopular();
      return;
    }
    setQuery(searchQuery);
    setLoading(true);
    setError(null);
    try {
      const { movies: results } = await searchMovies(searchQuery);
      if (results.length === 0) {
        setError(`No movies found for "${searchQuery}"`);
        setMovies([]);
      } else {
        setMovies(results);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, loading, error, query, handleSearch };
}
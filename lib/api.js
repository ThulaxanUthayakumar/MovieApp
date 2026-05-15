const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com";

export async function searchMovies(query, page = 1) {
  const res = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${query}&page=${page}&type=movie`
  );
  const data = await res.json();
  if (data.Response === "False") return { movies: [], total: 0 };
  return { movies: data.Search, total: parseInt(data.totalResults) };
}

export async function getMovieById(id) {
  const res = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`
  );
  const data = await res.json();
  if (data.Response === "False") return null;
  return data;
}

export async function getPopularMovies() {
  const popular = ["Inception", "Interstellar", "The Dark Knight", "Parasite"];
  const promises = popular.map((title) =>
    fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${title}&type=movie`).then((r) =>
      r.json()
    )
  );
  const results = await Promise.all(promises);
  return results.filter((r) => r.Response !== "False");
}
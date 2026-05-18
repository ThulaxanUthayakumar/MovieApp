const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com";

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`
  );
  const data = await res.json();
  if (data.Response === "False") return [];
  return data.Search;
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
  const titles = ["Inception", "Interstellar", "The Dark Knight", "Parasite", "Dune", "Oppenheimer", "The Matrix", "Avengers"];
  const results = await Promise.all(
    titles.map((t) =>
      fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(t)}&type=movie`)
        .then((r) => r.json())
    )
  );
  return results.filter((r) => r.Response !== "False");
}
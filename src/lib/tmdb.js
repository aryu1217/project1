export async function fetchPopularMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&api_key=${process.env.TMDB_API_KEY}`
  );

  console.log("📡 응답 상태:", res.status);
  console.log("TMDB_API_KEY:", process.env.TMDB_API_KEY);

  if (!res.ok) {
    throw new Error("Failed to fetch popular movies");
  }

  return res.json();
}

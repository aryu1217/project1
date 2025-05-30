export async function GET() {
  const currentYear = new Date().getFullYear();
  const releaseDateGte = `${currentYear}-01-01`;

  const url =
    "https://api.themoviedb.org/3/discover/movie?" +
    new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      language: "ko-KR",
      without_origin_country: "KR",
      include_adult: "false",
      sort_by: "popularity.desc",
      "primary_release_date.gte": releaseDateGte,
    });

  const res = await fetch(url);

  if (!res.ok) {
    return new Response("해외 영화 가져오기 실패!", { status: res.status });
  }

  try {
    const data = await res.json();
    return Response.json(data);
  } catch {
    return new Response("Invalid JSON response from TMDB", { status: 500 });
  }
}

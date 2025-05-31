export async function GET() {
  const currentYear = new Date().getFullYear();
  const releaseDateGte = `${currentYear}-01-01`;

  const url =
    `https://api.themoviedb.org/3/discover/movie?` +
    new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      language: "ko-KR",
      with_origin_country: "KR",
      include_adult: "false",
      sort_by: "popularity.desc",
      "primary_release_date.gte": releaseDateGte,
    });

  const res = await fetch(url);

  if (!res.ok) {
    return new Response("국내 영화 가져오기 실패!", { status: res.status });
  }

  try {
    const data = await res.json();

    const modifiedResults = data.results.map((item) => ({
      ...item,
      type: "movie",
    }));

    return Response.json({ ...data, results: modifiedResults });
  } catch {
    return new Response("Invalid JSON response from TMDB", { status: 500 });
  }
}

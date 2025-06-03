export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";

  const currentYear = new Date().getFullYear();
  const airDateGte = `${currentYear}-01-01`;

  const url =
    "https://api.themoviedb.org/3/discover/tv?" +
    new URLSearchParams({
      api_key: process.env.TMDB_API_KEY,
      language: "ko-KR",
      with_origin_country: "KR", // 한국 드라마만
      with_genres: "18",
      sort_by: "popularity.desc",
      "first_air_date.gte": airDateGte,
      page,
    });

  const res = await fetch(url);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ TMDB 응답 오류", res.status, errorText);
    return new Response("TMDB fetch failed", { status: res.status });
  }

  try {
    const data = await res.json();

    const modifiedResults = data.results.map((item) => ({
      ...item,
      type: "drama",
    }));

    return Response.json({ ...data, results: modifiedResults });
  } catch (e) {
    console.error("❌ JSON 파싱 실패:", e);
    return new Response("Invalid JSON response from TMDB", { status: 500 });
  }
}

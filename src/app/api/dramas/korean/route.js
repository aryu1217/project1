// /app/api/dramas/korean/route.js

export async function GET() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?language=ko-KR&with_origin_country=KR&sort_by=popularity.desc&with_genres=18&api_key=${process.env.TMDB_API_KEY}`
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ TMDB 응답 오류", res.status, errorText);
    return new Response("TMDB fetch failed", { status: res.status });
  }

  try {
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("❌ JSON 파싱 실패:", e);
    return new Response("Invalid JSON response from TMDB", { status: 500 });
  }
}

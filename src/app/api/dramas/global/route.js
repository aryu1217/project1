export async function GET() {
  const res =
    await fetch(`https://api.themoviedb.org/3/discover/tv?language=ko-KR&without_origin_country=KR&with_genres=18&sort_by=popularity.desc&api_key=${process.env.TMDB_API_KEY}
`);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ TMDB 응답 오류", res.status, errorText);
    return new Response("해외드라마 가져오기 실패.", { status: res.status });
  }

  try {
    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("❌ JSON 파싱 실패:", e);
    return new Response("Invalid JSON response from TMDB", { status: 500 });
  }
}

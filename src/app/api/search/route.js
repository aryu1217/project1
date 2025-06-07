export async function GET(request) {
  const query = request.nextUrl.searchParams.get("query");

  if (!query) {
    return Response.json({ results: [] }, { status: 200 });
  }

  const API_KEY = process.env.TMDB_API_KEY;

  const encoded = encodeURIComponent(query);
  const encodedNoSpace = encodeURIComponent(query.replace(/\s/g, ""));

  const url1 = `https://api.themoviedb.org/3/search/multi?query=${encoded}&language=ko-KR&api_key=${API_KEY}`;
  const url2 = `https://api.themoviedb.org/3/search/multi?query=${encodedNoSpace}&language=ko-KR&api_key=${API_KEY}`;

  try {
    const [res1, res2] = await Promise.all([fetch(url1), fetch(url2)]);

    if (!res1.ok && !res2.ok) {
      return new Response("TMDB 요청 실패", { status: 500 });
    }

    const data1 = res1.ok ? await res1.json() : { results: [] };
    const data2 = res2.ok ? await res2.json() : { results: [] };

    const resultMap = new Map();
    [...data1.results, ...data2.results].forEach((item) => {
      if (item.id) resultMap.set(item.id, item);
    });

    return Response.json({ results: Array.from(resultMap.values()) });
  } catch (err) {
    return new Response("검색 중 오류 발생", { status: 500 });
  }
}

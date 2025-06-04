export default async function SearchPage({ searchParams }) {
  const { query } = await searchParams;

  if (!query) return <p>검색어가 없습니다.</p>;

  const encoded = encodeURIComponent(query);

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encoded}&language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("검색 결과를 가져오는 데 실패했습니다.");

  const data = await res.json();

  return (
    <div className="text-white p-6">
      <h1 className="text-xl mb-4">🔍 {query} 검색 결과</h1>
      <ul className="space-y-2">
        {data.results.map((item) => (
          <li key={item.id}>{item.title || item.name}</li>
        ))}
      </ul>
    </div>
  );
}

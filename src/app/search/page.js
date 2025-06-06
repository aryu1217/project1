import SearchContentList from "@/components/search-contentList";

export default async function SearchPage({ searchParams }) {
  const { query } = await searchParams;

  if (!query) return <p className="text-white">검색어가 없습니다.</p>;

  const encoded = encodeURIComponent(query);

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encoded}&language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("검색 결과를 가져오는 데 실패했습니다.");

  const data = await res.json();
  console.log(data);

  return (
    <>
      {data.total_results === 0 ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <p className="text-white text-lg">🔍 검색 결과가 없습니다.</p>
        </div>
      ) : (
        <SearchContentList contents={data.results} />
      )}
    </>
  );
}

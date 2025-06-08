import PaginationControls from "@/components/pagination-controls";
import SearchContentList from "@/components/search-contentList";

async function getParam(searchParams, key, fallback = "") {
  if (typeof searchParams.get === "function") {
    return (await searchParams.get(key)) ?? fallback;
  } else {
    return searchParams[key] ?? fallback;
  }
}

export default async function SearchPage({ searchParams }) {
  const query = await getParam(searchParams, "query");
  const type = await getParam(searchParams, "type", "multi");
  const page = await getParam(searchParams, "page", "1");

  if (!query) {
    return <p className="text-white p-10">검색어가 없습니다.</p>;
  }

  const encoded = encodeURIComponent(query);

  const res = await fetch(
    `https://api.themoviedb.org/3/search/${type}?query=${encoded}&language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("검색 결과를 가져오는 데 실패했습니다.");

  const data = await res.json();

  // 🔍 인물 검색이면 출연작 가져와서 보여줌
  if (type === "person" && data.results.length > 0) {
    const person = data.results[0];

    const creditRes = await fetch(
      `https://api.themoviedb.org/3/person/${person.id}/combined_credits?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
      { cache: "no-store" }
    );

    if (!creditRes.ok)
      throw new Error("출연작 정보를 가져오는 데 실패했습니다.");

    const credits = await creditRes.json();
    const castWorks = (credits.cast || []).sort(
      (a, b) => b.popularity - a.popularity
    );

    return <SearchContentList contents={castWorks} />;
  }

  // 🔍 일반 제목 검색
  return (
    <>
      {data.total_results === 0 ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <p className="text-white text-lg">🔍 검색 결과가 없습니다.</p>
        </div>
      ) : (
        <>
          <SearchContentList contents={data.results} />
          <PaginationControls
            page={parseInt(page)}
            totalPages={data.total_pages}
            query={query}
          />
        </>
      )}
    </>
  );
}

import CastList from "@/components/cast-list";
import { WatchedAddButton } from "@/components/watched-add-button";

export default async function ContentPage(props) {
  const { contentId } = await props.params;

  const detailRes = await fetch(
    `https://api.themoviedb.org/3/tv/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!detailRes.ok) {
    const errorText = await detailRes.text();
    console.error("❌ TMDB fetch error:", detailRes.status, errorText);
    return <div className="text-white p-10">콘텐츠를 불러오지 못했습니다.</div>;
  }

  const data = await detailRes.json();

  const creditRes = await fetch(
    `https://api.themoviedb.org/3/tv/${contentId}/credits?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const credits = creditRes.ok ? await creditRes.json() : { cast: [] };

  return (
    <div className="text-white p-10 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">{data.name}</h1>
        <div className="mt-[-45px] mr-8">
          <WatchedAddButton />
        </div>
      </div>
      <p className="text-lg mb-2">방영일: {data.first_air_date}</p>
      <p className="text-gray-300 leading-relaxed mb-8">{data.overview}</p>

      <h2 className="text-2xl font-semibold mb-4">등장인물</h2>
      <CastList cast={credits.cast} />
    </div>
  );
}

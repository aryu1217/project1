import { WatchedAddButton } from "@/components/watched-add-button";
import Image from "next/image";

export default async function MovieContentPage(props) {
  const { contentId } = await props.params;

  // 영화 상세 정보
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ TMDB fetch error:", res.status, errorText);
    return (
      <div className="text-white p-10">영화 정보를 불러오지 못했습니다.</div>
    );
  }

  const data = await res.json();

  // 등장인물 정보
  const creditRes = await fetch(
    `https://api.themoviedb.org/3/movie/${contentId}/credits?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const credits = creditRes.ok ? await creditRes.json() : { cast: [] };

  return (
    <div className="text-white p-10 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <div className="mt-[-45px] mr-8">
          <WatchedAddButton />
        </div>
      </div>
      <p className="text-lg mb-2">개봉일: {data.release_date}</p>
      <p className="text-gray-300 leading-relaxed mb-8">{data.overview}</p>

      <h2 className="text-2xl font-semibold mb-4">등장인물</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {credits.cast.slice(0, 12).map((person) => (
          <div
            key={person.id}
            className="flex flex-col items-center text-center"
          >
            {person.profile_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                alt={person.name}
                width={120}
                height={180}
                className="rounded-md object-cover mb-2"
              />
            ) : (
              <div className="w-[120px] h-[180px] bg-gray-700 rounded-md mb-2 flex items-center justify-center text-sm text-gray-400">
                No Image
              </div>
            )}
            <p className="text-sm font-medium">{person.name}</p>
            <p className="text-xs text-gray-400">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

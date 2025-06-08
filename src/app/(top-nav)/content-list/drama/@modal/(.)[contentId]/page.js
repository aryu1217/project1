import { notFound } from "next/navigation";
import Image from "next/image";
import ModalBackdrop from "@/components/modal-backdrop";
import { WatchedAddButton } from "@/components/watched-add-button";

export default async function DramaModal(props) {
  const { contentId } = await props.params;

  // 상세 정보 요청
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  // 등장인물 요청
  const creditRes = await fetch(
    `https://api.themoviedb.org/3/tv/${contentId}/credits?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const credits = creditRes.ok ? await creditRes.json() : { cast: [] };

  return (
    <>
      <ModalBackdrop />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 overflow-y-auto max-h-[90vh]">
        <div className="bg-[#1F1F1F]/80 text-white rounded-xl p-6 w-[600px] shadow-2xl relative">
          <h1 className="text-2xl font-bold mb-3">{data.name}</h1>
          <p className="text-sm text-gray-400 mb-2">
            방영일: {data.first_air_date}
          </p>
          <p className="text-base leading-relaxed text-gray-300 mb-6">
            {data.overview}
          </p>

          <h2 className="text-xl font-semibold mb-3">등장인물</h2>
          <div className="grid grid-cols-3 gap-4">
            {credits.cast.slice(0, 6).map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center text-center"
              >
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                    alt={person.name}
                    width={80}
                    height={120}
                    className="rounded-md object-cover mb-1"
                  />
                ) : (
                  <div className="w-[80px] h-[120px] bg-gray-700 rounded-md mb-1 flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}
                <p className="text-xs font-medium">{person.name}</p>
                <p className="text-[11px] text-gray-400">{person.character}</p>
              </div>
            ))}
          </div>
          <WatchedAddButton />
        </div>
      </div>
    </>
  );
}

import { notFound } from "next/navigation";
import ModalBackdrop from "@/components/modal-backdrop";
import Image from "next/image";
import { Watch } from "lucide-react";
import { WatchedAddButton } from "@/components/watched-add-button";

export default async function MovieModal(props) {
  const { contentId } = await props.params;

  // 영화 상세 정보
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  // 등장인물 정보
  const creditRes = await fetch(
    `https://api.themoviedb.org/3/movie/${contentId}/credits?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const credits = creditRes.ok ? await creditRes.json() : { cast: [] };

  return (
    <>
      <ModalBackdrop />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[700px] px-4">
        <div className="bg-[#1F1F1F]/80 text-white rounded-xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
          <h1 className="text-2xl font-bold mb-3">{data.title}</h1>
          <p className="text-sm text-gray-400 mb-2">
            개봉일: {data.release_date}
          </p>
          <p className="text-base leading-relaxed text-gray-300 mb-6">
            {data.overview}
          </p>

          <h2 className="text-xl font-semibold mb-3">등장인물</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {credits.cast.slice(0, 6).map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center text-center"
              >
                {person.profile_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                    alt={person.name}
                    width={100}
                    height={150}
                    className="rounded-md object-cover mb-2"
                  />
                ) : (
                  <div className="w-[100px] h-[150px] bg-gray-700 rounded-md mb-2 flex items-center justify-center text-sm text-gray-400">
                    No Image
                  </div>
                )}
                <p className="text-sm font-medium">{person.name}</p>
                <p className="text-xs text-gray-400">{person.character}</p>
              </div>
            ))}
          </div>
          <WatchedAddButton />
        </div>
      </div>
    </>
  );
}

import { notFound } from "next/navigation";
import ModalBackdrop from "@/components/modal-backdrop";

export default async function MovieModal(props) {
  const { contentId } = await props.params;

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  return (
    <>
      <ModalBackdrop />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <div className="bg-[#1F1F1F] text-white rounded-xl p-6 w-[600px] shadow-2xl relative">
          <h1 className="text-2xl font-bold mb-3">{data.name}</h1>
          <p className="text-sm text-gray-400 mb-2">
            방영일: {data.first_air_date}
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            {data.overview}
          </p>
        </div>
      </div>
    </>
  );
}

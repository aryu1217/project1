import { notFound } from "next/navigation";
import ModalBackdrop from "@/components/modal-backdrop";

export default async function DramaModal(props) {
  const { contentId } = await props.params;

  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${contentId}?language=ko-KR&api_key=${process.env.TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    notFound(); // TMDB에 없는 ID면 404
  }

  const data = await res.json();

  return (
    <>
      <ModalBackdrop />
      <dialog open className="modal z-50 border-none bg-transparent">
        <div className="p-6 w-[600px] bg-[#1F1F1F] text-white rounded-xl relative shadow-2xl">
          <h1 className="text-2xl font-bold mb-3">{data.name}</h1>
          <p className="text-sm text-gray-400 mb-2">
            방영일: {data.first_air_date}
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            {data.overview}
          </p>
        </div>
      </dialog>
    </>
  );
}

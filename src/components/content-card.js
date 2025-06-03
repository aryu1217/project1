"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ContentCard({
  title,
  imagePath,
  ranking,
  type,
  contentId,
  page,
}) {
  const router = useRouter();

  const handleClick = () => {
    setTimeout(() => {
      router.push(`/content-list/${type}/${contentId}`, { scroll: false });
    }, 1);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-gray-800 rounded-lg p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 cursor-pointer transition-all duration-300 w-[260px] h-[410px] flex-col relative"
    >
      {ranking === 0 && page === 1 && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 shadow-md">
          1위
        </div>
      )}
      {ranking === 1 && page === 1 && (
        <div className="absolute top-2 left-2 bg-gray-300 text-gray-900 text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 shadow-md">
          2위
        </div>
      )}
      {ranking === 2 && page === 1 && (
        <div className="absolute top-2 left-2 bg-[#cd7f32] text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center z-10 shadow-md">
          3위
        </div>
      )}

      <div className="aspect-[2/3] w-full relative rounded-lg overflow-hidden mb-4 mx-auto">
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 260px"
          className="object-cover"
        />
      </div>

      <h2 className="text-lg font-semibold text-white mt-2 text-center">
        {title}
      </h2>
    </div>
  );
}

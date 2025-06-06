"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchContentCard({
  title,
  imagePath,
  type,
  contentId,
  overview,
}) {
  const router = useRouter();

  const handleClick = () => {
    if (type === "unknown") return;
    if (type === "tv") type = "drama";
    router.push(`/content-list/${type}/${contentId}`, { scroll: false });
  };

  return (
    <div
      onClick={handleClick}
      className="flex gap-4 cursor-pointer w-full border p-4"
    >
      <div className="w-[200px] h-[300px] relative flex-shrink-0">
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt={title || "포스터 이미지"}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex flex-col justify-center h-[300px] overflow-hidden text-left">
        <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 line-clamp-3">
          {overview || "개요 정보가 없습니다."}
        </p>
      </div>
    </div>
  );
}

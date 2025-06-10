"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import StarRating from "@/components/star-rating";
import WatchDateSelector from "@/components/watch-date-selector";
import LoadingSpinner from "@/components/loading-spinner";
import { WatchedAddButton } from "@/components/watched-add-button";

export default function ReviewForm() {
  const path = usePathname();
  const type = path.split("/")[2]; // movie | drama
  const contentId = path.split("/")[3]; // ex) 12345

  const [rating, setRating] = useState(0);
  const [data, setData] = useState(null);
  const [watchDate, setWatchDate] = useState("");
  const [review, setReview] = useState("");

  useEffect(() => {
    if (!type || !contentId) return;

    const fetchData = async () => {
      const tmdbType = type === "drama" ? "tv" : type;

      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${tmdbType}/${contentId}?language=ko-KR&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("❌ 콘텐츠 정보 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [type, contentId]);

  if (!data) {
    return (
      <div className="flex items-center justify-center w-full h-[600px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-10 flex items-stretch justify-center gap-36 pt-16">
      <div className="shrink-0">
        {data.poster_path ? (
          <Image
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            width={500}
            height={750} // 고정 비율 유지
          />
        ) : (
          <div>No Image</div>
        )}
      </div>

      <div className="w-px bg-gradient-to-b from-transparent via-[#6A7183]/50 to-transparent" />

      <div className="flex flex-col gap-6 text-white max-w-xl flex-1 self-stretch">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold flex-1">
            {type === "tv" ? data.name : data.title}
          </h1>
          <div className="mt-[-40px] text-sm ">
            <WatchedAddButton />
          </div>
        </div>

        <p className="text-sm text-gray-400">
          {type === "tv"
            ? `방영일: ${data.first_air_date}`
            : `개봉일: ${data.release_date}`}
        </p>

        <p className="text-gray-300 leading-relaxed text-sm">
          {data.overview || "개요 정보가 없습니다."}
        </p>

        <div className="flex flex-col gap-3">
          <StarRating rating={rating} setRating={setRating} />
          <p className="text-gray-400 text-sm">{rating}점</p>
        </div>

        <WatchDateSelector date={watchDate} setDate={setWatchDate} />

        {/* ✨ textarea height = auto grow to fill remaining space */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="리뷰를 작성하세요..."
            className="w-full flex-1 p-4 bg-[#2a2a2a] text-white border border-gray-600 rounded-lg resize-none focus:outline-none"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

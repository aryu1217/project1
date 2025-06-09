"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import MyDatePicker from "@/components/my-date-picker";
import StarRating from "@/components/star-rating";
import { Calendar } from "@/components/ui/calendar";

export default function ReviewForm() {
  const path = usePathname();
  const type = path.split("/")[2]; // movie | drama
  const contentId = path.split("/")[3]; // ex) 12345

  const [rating, setRating] = useState(0);

  const [data, setData] = useState(null);

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
    return <p className="text-white p-10">로딩 중...</p>;
  }

  return (
    <div className="p-10 flex items-start justify-center gap-36">
      <div>
        {data.poster_path ? (
          <Image
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title || data.name}
            width={500}
            height={0}
          />
        ) : (
          <div>No Image</div>
        )}
      </div>

      <div className="flex flex-col gap-6 text-white max-w-xl justify-start">
        <h1 className="text-2xl font-bold">
          {type === "tv" ? data.name : data.title}
        </h1>

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

        <Calendar />
        <MyDatePicker />
      </div>
    </div>
  );
}

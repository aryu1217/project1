"use client";

import ContentsList from "@/components/contents-list";
import { fetchGlobalPopularDramas, fetchKorPopularDramas } from "@/lib/tmdb";
import { useEffect, useState } from "react";

export default function DramaPage() {
  const [selected, setSelected] = useState("kor");
  const [dramas, setDramas] = useState(null); // ✅ 초기값 null

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/dramas/korean");
      const data = await res.json();
      setDramas(data.results);
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex mx-auto w-[1400px] bg-[#FFFFFF]/10 rounded-full p-1">
        <button
          onClick={() => setSelected("kor")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
          ${selected === "kor" ? "bg-[#141517] text-white" : "text-[#FFFFFF]"}`}
        >
          국내
        </button>
        <button
          onClick={() => setSelected("global")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
          ${
            selected === "global" ? "bg-[#141517] text-white" : "text-[#FFFFFF]"
          }`}
        >
          해외
        </button>
      </div>

      {dramas ? (
        <ContentsList contents={dramas} />
      ) : (
        <p className="text-white">로딩 중...</p>
      )}
    </>
  );
}

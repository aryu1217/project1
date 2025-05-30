"use client";

import ContentsList from "@/components/contents-list";
import { useEffect, useState } from "react";

export default function DramaPage() {
  const [selected, setSelected] = useState("kor");
  const [dramas, setDramas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        selected === "kor" ? "/api/dramas/korean" : "/api/dramas/global"
      );

      const data = await res.json();
      setDramas(data.results);
    };

    fetchData();
  }, [selected]);

  return (
    <>
      <div className="flex mx-auto w-[1470px] bg-[#FFFFFF]/10 rounded-full p-1">
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

      <ContentsList contents={dramas} />
    </>
  );
}

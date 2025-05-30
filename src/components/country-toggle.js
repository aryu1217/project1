"use client";

import { useState } from "react";
import DramaContents from "./drama-contents";
import { Suspense } from "react";

export default function CountryToggle() {
  const [selected, setSelected] = useState("kor");

  return (
    <>
      <div className="flex mx-auto w-[1470px] bg-[#FFFFFF]/10 rounded-full p-1">
        <button
          onClick={() => {
            console.log("kor");
            setSelected("kor");
          }}
          className={`flex-1 px-4 py-1 rounded-full transition-all
              ${
                selected === "kor"
                  ? "bg-[#141517] text-white"
                  : "text-[#FFFFFF]"
              }`}
        >
          국내
        </button>
        <button
          onClick={() => setSelected("global")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
              ${
                selected === "global"
                  ? "bg-[#141517] text-white"
                  : "text-[#FFFFFF]"
              }`}
        >
          해외
        </button>
      </div>

      <Suspense fallback={<p className="text-white">로딩 중...</p>}>
        <DramaContents key={selected} selected={selected} />
      </Suspense>
    </>
  );
}

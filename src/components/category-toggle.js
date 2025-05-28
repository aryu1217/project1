"use client";

import Link from "next/link";
import { useState } from "react";

export default function CategoryToggle() {
  const [selected, setSelected] = useState("drama");

  return (
    <div className="flex gap-10">
      <Link href="/content-list/drama">
        <button
          onClick={() => setSelected("drama")}
          className={`
          ${
            selected === "drama" ? "bg-[#141517] text-white" : "text-[#6A7183]"
          }`}
        >
          드라마
        </button>
      </Link>
      <Link href="/content-list/movie">
        <button
          onClick={() => setSelected("movie")}
          className={`
          ${
            selected === "movie" ? "bg-[#141517] text-white" : "text-[#6A7183]"
          }`}
        >
          영화
        </button>
      </Link>
    </div>
  );
}

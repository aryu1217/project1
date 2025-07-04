"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CategoryToggle() {
  const path = usePathname();
  const selected = path.includes("/movie") ? "movie" : "drama";

  return (
    <div className="flex gap-10 relative w-fit">
      <span
        className="absolute top-2 w-[45%] h-5 bg-gradient-to-b from-yellow-300/80 to-transparent rounded-md blur-md z-0 transition-all duration-300 pointer-events-none"
        style={{
          left: selected === "drama" ? "0%" : "calc(50% + 20px)",
        }}
      ></span>

      <Link href="/content-list/drama" className="relative">
        <button
          className={`relative z-10 px-2 py-1 text-lg font-medium transition ${
            selected === "drama"
              ? "text-white"
              : "text-[#6A7183] hover:text-white"
          }`}
        >
          드라마
        </button>
      </Link>

      <Link href="/content-list/movie" className="relative">
        <button
          className={`relative z-10 px-2 py-1 text-lg font-medium transition ${
            selected === "movie"
              ? "text-white"
              : "text-[#6A7183] hover:text-white"
          }`}
        >
          영화
        </button>
      </Link>
    </div>
  );
}

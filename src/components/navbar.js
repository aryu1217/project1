"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="border-b border-[#6A7183]  p-4">
      <div className="flex justify-between w-full max-w-screen-2xl mx-auto items-center">
        <Link href="/home" className="flex cursor-pointer">
          <Image
            src="/box-star2.png"
            alt="box-star"
            width={50}
            height={50}
            className="self-center mr-3"
          />
          <div className="flex text-2xl font-bold text-white items-center tracking-wider">
            내가본거
          </div>
        </Link>
        <form>
          <input
            type="text"
            placeholder="영화 검색..."
            className="
              px-3 py-1.5 rounded-xl w-[350px]
              text-sm text-black placeholder-gray-400 focus:outline-none
            "
          />
        </form>
        <ul className="flex gap-6 text-sm">
          <li>
            <Link href="/movie-list">영화목록</Link>
          </li>
          <li>
            <Link href="/my-view">내 감상기록</Link>
          </li>
          <li>친구</li>
          <li>알림</li>
          <li>
            <Link href="/login">로그인</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

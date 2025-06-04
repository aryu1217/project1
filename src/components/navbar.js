import Link from "next/link";
import Image from "next/image";
import LoginStatus from "./login-status";
import { Bell } from "lucide-react";

import SearchForm from "./search-form";

export default function Navbar() {
  return (
    <div className="border-b border-[#6A7183] p-4">
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

        <SearchForm />

        <ul className="flex text-sm items-center gap-2">
          <li>
            <Link
              href="/content-list/drama"
              className="w-24 h-8 flex items-center justify-center rounded-full hover:bg-[#6A7183] transition text-white"
            >
              볼거리들
            </Link>
          </li>
          <li>
            <Link
              href="/my-view"
              className="w-24 h-8 flex items-center justify-center rounded-full hover:bg-[#6A7183] transition text-white"
            >
              내 감상기록
            </Link>
          </li>
          <li>
            <Link
              href="/your-view"
              className="w-24 h-8 flex items-center justify-center rounded-full hover:bg-[#6A7183] transition text-white"
            >
              너가본거
            </Link>
          </li>
          <li>
            <div className="w-8 h-8 flex mx-3 items-center justify-center rounded-full hover:bg-[#6A7183] transition">
              <Bell className="w-4 h-4 text-white" />
            </div>
          </li>
          <li>
            <div className="h-8 flex items-center justify-center rounded-full hover:bg-[#6A7183] transition">
              <LoginStatus />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function LoginStatus() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (status === "loading")
    return (
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-white">user</span>
        <Image
          src="/default-avatar.png"
          alt="User Avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>
    );

  if (!session) {
    return (
      <div>
        <Link
          href="/login"
          className="w-24 h-8 flex items-center justify-center rounded-full hover:bg-[#6A7183] transition text-white"
        >
          로그인
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 cursor-pointer"
      >
        <span className="text-white">{session.user.nickname}</span>
        <Image
          src={session.user.image}
          alt="User Avatar"
          width={30}
          height={30}
          className="rounded-full"
        />
      </div>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[#1e1e1e] rounded shadow-lg z-50 p-2 text-sm text-white">
          <Link
            href="/profile"
            className="block px-3 py-2 hover:bg-[#434445] rounded"
          >
            내 프로필
          </Link>
          <Link
            href="/profile"
            className="block px-3 py-2 hover:bg-[#434445] rounded"
          >
            업적
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full text-left px-3 py-2 hover:bg-[#434445] rounded"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

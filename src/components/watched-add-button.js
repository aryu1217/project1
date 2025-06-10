"use client";

import { usePathname, useRouter } from "next/navigation";

export function WatchedAddButton() {
  const pathname = usePathname();
  const route = useRouter();

  const parts = pathname.split("/");
  const rawType = parts[2];
  const type = rawType === "drama" ? "tv" : rawType;
  const contentId = parts[3];

  const handleClick = () => {
    route.push(`/review-form/${type}/${contentId}`);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex mx-auto items-center border border-[#6A7183] rounded-full p-2 px-5 mt-10 hover:bg-[#6A7183] transition text-[#dee2ea]"
      >
        <p className="font-bold mr-2 text-xl">+</p>
        <p>내가본거에 추가</p>
      </button>
    </>
  );
}

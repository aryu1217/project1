"use client";

import { useRouter, usePathname } from "next/navigation";

export default function CountryToggle({ selected }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (value) => {
    // 클릭 시 쿼리스트링 변경
    router.push(`${pathname}?country=${value}`);
  };

  return (
    <div className="flex mx-auto w-[300px] bg-[#FFFFFF]/10 rounded-full p-1">
      <button
        onClick={() => handleClick("domestic")}
        className={`flex-1 px-4 py-1 rounded-full transition-all
          ${
            selected === "domestic"
              ? "bg-[#141517] text-white"
              : "text-[#FFFFFF]"
          }`}
      >
        국내
      </button>
      <button
        onClick={() => handleClick("international")}
        className={`flex-1 px-4 py-1 rounded-full transition-all
          ${
            selected === "international"
              ? "bg-[#141517] text-white"
              : "text-[#FFFFFF]"
          }`}
      >
        해외
      </button>
    </div>
  );
}

"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("multi");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}&type=${type}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-[480px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어를 입력하세요..."
        className="bg-[#141517] border border-[#6A7183] pl-[80px] pr-10 py-2 rounded-3xl w-full text-sm text-[#dee2ea] placeholder-gray-400 focus:outline-none"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#141517] text-[#dee2ea] text-xs px-2 py-1 focus:outline-none focus:ring-0"
      >
        <option value="multi">제목</option>
        <option value="person">인물</option>
      </select>

      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Search className="w-4 h-4 text-gray-400" />
      </button>
    </form>
  );
}

"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchForm() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <form className="relative" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="영화 검색..."
        className="bg-[#141517] border border-[#6A7183] px-5 py-2 rounded-3xl w-[450px] text-md text-[#dee2ea] placeholder-gray-400 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-5 flex items-center justify-center"
      >
        <Search className="w-4 h-4 text-gray-400" />
      </button>
    </form>
  );
}

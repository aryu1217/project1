"use client";

import ContentsList from "@/components/contents-list";
import LoadingSpinner from "@/components/loading-spinner";
import PageButton from "@/components/page-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DramaPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [selected, setSelected] = useState("korean");
  const [page, setPage] = useState(initialPage);
  const [dramas, setDramas] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const res = await fetch(`/api/dramas/${selected}?page=${page}`);

      const data = await res.json();
      setDramas(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    };

    fetchData();
  }, [selected, page]);

  useEffect(() => {
    router.replace(`/content-list/drama?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  const handleSelect = (type) => {
    setSelected(type);
    setPage(1); // 선택 바뀌면 첫 페이지로
  };

  return (
    <>
      {/* 선택 토글 버튼 */}
      <div className="flex mx-auto w-[1470px] bg-[#FFFFFF]/10 rounded-full p-1">
        <button
          onClick={() => handleSelect("korean")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
            ${
              selected === "korean"
                ? "bg-[#141517] text-white"
                : "text-[#FFFFFF]"
            }`}
        >
          국내
        </button>
        <button
          onClick={() => handleSelect("global")}
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

      {/* 콘텐츠 리스트 or 로딩 */}
      {isLoading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ContentsList contents={dramas} page={page} />
          <PageButton page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </>
  );
}

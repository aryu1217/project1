"use client";

import ContentsList from "@/components/contents-list";
import LoadingSpinner from "@/components/loading-spinner";
import PageButton from "@/components/page-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const router = useRouter();
  const searchParams = new useSearchParams();

  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(10);
  const [selected, setSelected] = useState("korean");
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setMovies(null);
      const res = await fetch(
        selected === "korean" ? "/api/movies/korean" : "/api/movies/global"
      );

      const data = await res.json();
      setIsLoading(false);
      setTotalPages(data.total_pages);
      setMovies(data.results);
    };

    fetchData();
  }, [selected]);

  useEffect(() => {
    router.replace(`/content-list/movie?page=${page}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <>
      <div className="flex mx-auto w-[1470px] bg-[#FFFFFF]/10 rounded-full p-1">
        <button
          onClick={() => setSelected("korean")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
          ${
            selected === "korean" ? "bg-[#141517] text-white" : "text-[#FFFFFF]"
          }`}
        >
          국내
        </button>
        <button
          onClick={() => setSelected("global")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
          ${
            selected === "global" ? "bg-[#141517] text-white" : "text-[#FFFFFF]"
          }`}
        >
          해외
        </button>
      </div>

      {isLoading ? (
        <div className="w-full h-[300px] flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <ContentsList contents={movies} />
          <PageButton page={page} setPage={setPage} totalPages={totalPages} />
        </>
      )}
    </>
  );
}

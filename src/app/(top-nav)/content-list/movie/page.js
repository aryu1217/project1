"use client";

import ContentsList from "@/components/contents-list";
import LoadingSpinner from "@/components/loading-spinner";
import { useEffect, useState } from "react";

export default function MoviePage() {
  const [selected, setSelected] = useState("kor");
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setMovies(null);
      const res = await fetch(
        selected === "kor" ? "/api/movies/korean" : "/api/movies/global"
      );

      const data = await res.json();
      setIsLoading(false);
      setMovies(data.results);
    };

    fetchData();
  }, [selected]);

  return (
    <>
      <div className="flex mx-auto w-[1470px] bg-[#FFFFFF]/10 rounded-full p-1">
        <button
          onClick={() => setSelected("kor")}
          className={`flex-1 px-4 py-1 rounded-full transition-all
          ${selected === "kor" ? "bg-[#141517] text-white" : "text-[#FFFFFF]"}`}
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
        <ContentsList contents={movies} />
      )}
    </>
  );
}

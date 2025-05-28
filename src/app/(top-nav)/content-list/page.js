import CountryToggle from "@/components/country-toggle";
import PopularMovieList from "@/components/contents-list";
import { fetchPopularMovies } from "@/lib/tmdb";

export default async function MovieList() {
  const data = await fetchPopularMovies();

  if (!data) {
    return <p className="mt-6 text-white">영화 목록을 불러오는 중...</p>;
  }

  return (
    <div className="relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6A7183]/50 to-transparent" />

      <div className="pt-3">
        <CountryToggle />
      </div>

      <PopularMovieList movies={data} />
    </div>
  );
}

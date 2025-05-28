import CategoryToggle from "@/components/category-toggle";
import PopularMovieList from "@/components/movie-list";
import { fetchPopularMovies } from "@/lib/tmdb";

export default async function MovieList() {
  const data = await fetchPopularMovies();
  if (!data) {
    return <p className="mt-6 text-white">영화 목록을 불러오는 중...</p>;
  }

  return (
    <div className="w-full max-w-screen-2xl mx-auto p-3">
      <div className="font-bold text-2xl">뭐 볼까?</div>
      <div className="">
        <CategoryToggle className />
      </div>
      <PopularMovieList movies={data} />
    </div>
  );
}

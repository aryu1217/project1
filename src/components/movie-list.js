import MovieCard from "./movie-card";

export default function PopularMovieList({ movies }) {
  const movieList = movies.results;
  return (
    <div className="relative inline-flex w-fit flex-wrap gap-11 justify-center pt-3">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6A7183]/50 to-transparent"></div>

      {movieList.map((movie, index) => (
        <MovieCard
          key={index}
          title={movie.title}
          imagePath={movie.poster_path}
        />
      ))}
    </div>
  );
}

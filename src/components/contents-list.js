import MovieCard from "./content-card";

export default function ContentsList({ contents }) {
  return (
    <div className="relative inline-flex w-fit flex-wrap gap-11 justify-center pt-4">
      {contents.map((content, index) => (
        <MovieCard
          key={index}
          title={content.title || content.name}
          imagePath={content.poster_path}
        />
      ))}
    </div>
  );
}

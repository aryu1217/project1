import MovieCard from "./content-card";

export default function ContentsList({ contents }) {
  if (!contents) {
    return <p className="text-white">로딩 중...</p>;
  }

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

import MovieCard from "./content-card";

export default function ContentsList({ contents }) {
  if (!contents) {
    return null;
  }

  return (
    <div className="relative inline-flex w-fit flex-wrap gap-11 justify-center pt-4">
      {contents.map((content, index) => (
        <MovieCard
          key={content.id}
          title={content.title || content.name}
          imagePath={content.poster_path}
          ranking={index}
          contentId={content.id}
          type={content.type}
        />
      ))}
    </div>
  );
}

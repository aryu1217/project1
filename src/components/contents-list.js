import MovieCard from "./content-card";
import LoadingSpinner from "./loading-spinner";

export default function ContentsList({ contents }) {
  if (!contents) {
    return (
      // <div className="w-full h-[300px] flex items-center justify-center">
      //   <LoadingSpinner />
      // </div>
      null
    );
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

"use client";
import SearchContentCard from "./search-contentCard";

export default function SearchContentList({ contents }) {
  const filteredContents = contents.filter(
    (content) => content.media_type !== "person"
  );

  return (
    <div className="flex flex-col gap-6 items-start p-10">
      {filteredContents.map((content) => (
        <SearchContentCard
          key={content.id}
          title={content.title || content.name}
          imagePath={content.poster_path}
          contentId={content.id}
          overview={content.overview}
          type={
            content.media_type === "movie" || content.media_type === "tv"
              ? content.media_type
              : "unknown"
          }
        />
      ))}
    </div>
  );
}

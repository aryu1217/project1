// components/CastList.js
import Image from "next/image";

export default function CastList({ cast }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {cast.slice(0, 12).map((person) => (
        <div key={person.id} className="flex flex-col items-center text-center">
          {person.profile_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
              alt={person.name}
              width={120}
              height={180}
              className="object-cover rounded-md mb-2"
            />
          ) : (
            <div className="w-[120px] h-[180px] bg-gray-700 rounded-md mb-2 flex items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}
          <p className="text-sm font-medium">{person.name}</p>
          <p className="text-xs text-gray-400">{person.character}</p>
        </div>
      ))}
    </div>
  );
}

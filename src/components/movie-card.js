import Image from "next/image";

export default function MovieCard({ title, imagePath }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-[260px] h-[400px] flex-col">
      <Image
        src={`https://image.tmdb.org/t/p/w500${imagePath}`}
        alt={title}
        width={300}
        height={0}
        className="rounded-lg mb-4 mx-auto "
      />
      <h2 className="text-xl font-semibold text-white mb-2 items-center">
        {title}
      </h2>
    </div>
  );
}

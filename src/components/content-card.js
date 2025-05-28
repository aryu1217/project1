import Image from "next/image";

export default function ContentCard({ title, imagePath }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 w-[260px] h-[410px] flex-col">
      <div className="aspect-[2/3] w-full relative rounded-lg overflow-hidden mb-4 mx-auto">
        <Image
          src={`https://image.tmdb.org/t/p/w500${imagePath}`}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h2 className="text-lg font-semibold text-white mt-2 text-center">
        {title}
      </h2>
    </div>
  );
}

import LoadingSpinner from "@/components/loading-spinner";

export default function SearchLoading() {
  return (
    <div className="flex items-center justify-center w-full h-[600px]">
      <LoadingSpinner />
    </div>
  );
}

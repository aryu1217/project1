import CategoryToggle from "@/components/category-toggle";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="w-full max-w-screen-2xl mx-auto p-3">
      <Link href="/content-list">
        <div className="font-bold text-2xl ml-6">뭐 볼까?</div>
      </Link>
      <div className="ml-6 mt-6 mb-3">
        <CategoryToggle />
      </div>
      {children}
    </div>
  );
}

// components/pagination-controls.js
"use client";

import { useRouter } from "next/navigation";
import PageButton from "./page-button";

export default function PaginationControls({ page, totalPages, query }) {
  const router = useRouter();

  const setPage = (newPage) => {
    router.push(`/search?query=${encodeURIComponent(query)}&page=${newPage}`);
  };

  return <PageButton page={page} setPage={setPage} totalPages={totalPages} />;
}

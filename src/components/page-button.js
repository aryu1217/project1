export default function PageButton({ page, setPage, totalPages }) {
  return (
    <div className="max-w-7xl w-full mx-auto p-4 mt-5 mb-5">
      <div className="flex flex-col items-center gap-3">
        {/* 좌우 이동 버튼 */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-[#252731] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028] transition-colors duration-200 disabled:opacity-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-[#252731] text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1E2028] transition-colors duration-200 disabled:opacity-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* 페이지 표시 */}
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Page{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {page}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-700 dark:text-gray-200">
            {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
}

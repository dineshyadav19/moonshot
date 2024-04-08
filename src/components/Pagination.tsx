import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Handle edge cases (first and last page)
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Calculate visible page range (considering actual totalPages)
  const visiblePages = Math.min(8, totalPages); // Ensure at most 8 buttons

  // Adjust startIndex based on totalPages and visiblePages
  const startIndex = Math.max(
    Math.ceil(currentPage - Math.min(visiblePages - 1, totalPages - 1) / 2),
    1,
  );

  // Ensure startIndex doesn't exceed totalPages
  const endIndex = Math.min(startIndex + visiblePages - 1, totalPages);

  // Generate page number buttons (adjusted for actual range)
  const pageNumbers = Array.from(
    { length: endIndex - startIndex + 1 },
    (_, i) => startIndex + i,
  );

  // Handle button clicks with proper clamping
  const handlePageClick = (newPage: number) => {
    onPageChange(Math.max(1, Math.min(newPage, totalPages))); // Clamp page number between 1 and totalPages
  };

  return (
    <div className="mt-4 flex justify-center">
      <button
        className={`mr-2 rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-black disabled:opacity-50 ${
          isFirstPage ? "cursor-not-allowed bg-gray-300 text-gray-500" : ""
        }`}
        disabled={isFirstPage}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        Prev
      </button>
      <div className="flex flex-wrap gap-x-0.5 md:gap-x-2">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-black ${
              currentPage === pageNumber
                ? "bg-brand-neutral-400 text-white"
                : ""
            }`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <button
        className={`mr-2 rounded-md px-3 py-2 font-medium text-gray-700 hover:bg-gray-100 hover:text-black disabled:opacity-50 ${
          isLastPage ? "cursor-not-aligned bg-gray-300 text-gray-500" : ""
        }`}
        disabled={isLastPage}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

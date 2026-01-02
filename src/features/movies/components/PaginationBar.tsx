import { GrFormPrevious as PreviousIcon } from "react-icons/gr";
import { GrFormNext as NextIcon } from "react-icons/gr";

function buildPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // near start
  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  // near end
  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  // middle
  return [1, "...", current - 1, current, current + 1, "...", total];
}

type PaginationBarProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationBar = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationBarProps) => {
  const pages = buildPages(currentPage, totalPages);

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-center text-white border border-gray-400 rounded-full overflow-hidden select-none mt-10 text-sm mb-10">
      {/* Previous */}
      <button
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        className={`
          h-10 inline-flex items-center gap-2 px-4 py-2 font-semibold transition
          ${
            canPrev
              ? "hover:bg-gray-700 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          }
        `}
      >
        <PreviousIcon className="text-xl" />
        Previous
      </button>

      {/* Pages */}
      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <span key={`dots-${idx}`} className="px-4 py-3 text-gray-400">
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-10 h-10 inline-flex items-center justify-center transition gap-4
              ${
                isActive
                  ? "bg-[#60A5FA]/80 text-white font-bold rounded-full cursor-pointer"
                  : "hover:bg-[#60A5FA]/50 cursor-pointer rounded-full cursor-pointer"
              }
            `}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        className={`
           h-10 inline-flex items-center gap-2 px-4 py-2 font-semibold transition
          ${
            canNext
              ? "hover:bg-gray-700 cursor-pointer"
              : "opacity-40 cursor-not-allowed"
          }
        `}
      >
        Next
        <NextIcon className="text-xl" />
      </button>
    </div>
  );
};

export default PaginationBar;

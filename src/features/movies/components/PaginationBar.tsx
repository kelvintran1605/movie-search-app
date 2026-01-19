import { GrFormPrevious as PreviousIcon } from "react-icons/gr";
import { GrFormNext as NextIcon } from "react-icons/gr";

function buildPages(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2)
    return [1, "...", total - 3, total - 2, total - 1, total];

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
    <div
      className="flex max-w-150 mx-auto items-center justify-center select-none mt-10 mb-10 text-sm rounded-full overflow-hidden
      border border-slate-300 bg-slate-100 text-slate-800
      dark:border-white/10 dark:bg-white/10 dark:text-white"
    >
      <button
        disabled={!canPrev}
        onClick={() => canPrev && onPageChange(currentPage - 1)}
        className={`h-10 inline-flex items-center gap-2 px-4 font-semibold transition
        ${
          canPrev
            ? "hover:bg-slate-200 dark:hover:bg-white/15 cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }`}
      >
        <PreviousIcon className="text-xl" />
        Previous
      </button>

      {pages.map((page, idx) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${idx}`}
              className="px-4 py-3 text-slate-400 dark:text-white/40"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 inline-flex items-center justify-center transition rounded-full
            ${
              isActive
                ? "bg-sky-500 text-white font-bold"
                : "hover:bg-sky-500/30 text-slate-800 dark:text-white cursor-pointer"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        disabled={!canNext}
        onClick={() => canNext && onPageChange(currentPage + 1)}
        className={`h-10 inline-flex items-center gap-2 px-4 font-semibold transition
        ${
          canNext
            ? "hover:bg-slate-200 dark:hover:bg-white/15 cursor-pointer"
            : "opacity-40 cursor-not-allowed"
        }`}
      >
        Next
        <NextIcon className="text-xl" />
      </button>
    </div>
  );
};

export default PaginationBar;

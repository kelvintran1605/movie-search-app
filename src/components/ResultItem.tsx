import type { SearchOption } from "@/types/movie";
import { useNavigate } from "react-router-dom";

const ResultItem = ({
  onPanelOpen,
  title,
  meta,
  subheading,
  url,
  option,
  id,
  type,
  index,
}: {
  index: number;
  id: number;
  option: SearchOption; // "multi" | "movie" | "tv" | "person"
  type?: string;
  title: string;
  meta: string;
  subheading: string[];
  url: string;
  onPanelOpen: (state: boolean) => void;
}) => {
  const navigate = useNavigate();

  const resolvedType = option === "multi" ? type : option;

  const go = () => {
    onPanelOpen(false);
    navigate(`/${resolvedType}/${id}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();

      const items = Array.from(
        document.querySelectorAll<HTMLButtonElement>("[data-result-item]"),
      );

      if (index === items.length - 1) {
        const allResultsButton =
          document.querySelector<HTMLButtonElement>("[data-result-all]");
        allResultsButton?.focus();
        return;
      }

      items[index + 1]?.focus();
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const items = Array.from(
        document.querySelectorAll<HTMLButtonElement>("[data-result-item]"),
      );

      if (index === 0) {
        const input = document.querySelector<HTMLInputElement>(
          "[data-search-input]",
        );
        input?.focus();
      } else {
        items[index - 1]?.focus();
      }
    }

    if (e.key === "Enter" || e.key === "") {
      e.preventDefault();
      go();
    }

    if (e.key === "Escape") {
      e.preventDefault();
      onPanelOpen(false);
    }
  };
  return (
    <button
      onKeyDown={handleKeyDown}
      data-result-item
      type="button"
      onClick={go}
      className="flex items-start gap-3 w-full border-b border-white/20 p-2 cursor-pointer hover:bg-gray-600/20 duration-150
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
      aria-label={`Open ${title}`}
    >
      <img
        loading="lazy"
        className="w-14 rounded-xl h-20 object-cover"
        src={url}
        alt={title}
      />

      <div className="flex flex-col">
        <div className="text-[1.1rem] font-medium text-left">{title}</div>
        <div className="text-gray-300 w-full line-clamp-1 text-left">
          {meta}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {Array.isArray(subheading)
            ? subheading.filter(Boolean).map((item) => (
                <span className="text-gray-400 text-sm" key={item}>
                  {item}
                </span>
              ))
            : subheading}
        </div>
      </div>
    </button>
  );
};

export default ResultItem;

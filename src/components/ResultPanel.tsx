import type { SearchMulti, SearchOption } from "@/types/movie";
import ResultItem from "./ResultItem";
import { mapMovieGenres } from "@/lib/tmdb.mapper";
import { useNavigate } from "react-router-dom";

const ResultPanel = ({
  onPanelOpen,
  results = [],
  option,
  query,
}: {
  onPanelOpen: (state: boolean) => void;
  results?: SearchMulti[];
  option: SearchOption;
  query: string;
}) => {
  const navigate = useNavigate();

  const handleAllResults = () => {
    onPanelOpen(false);
    navigate(
      `/search?query=${encodeURIComponent(query)}&option=${option}&page=1`,
    );
  };

  return (
    <div
      role="listbox"
      className="w-full min-h-[120px] absolute dark:bg-[#1A1A1A] top-full rounded-md"
    >
      {[...results]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 7)
        .map((result, index) => {
          const genres = result?.genres?.map((genre) => mapMovieGenres(genre));
          return (
            <ResultItem
              index={index}
              onPanelOpen={onPanelOpen}
              type={result.media_type}
              id={result.id}
              option={option}
              url={result.url}
              title={result.title || result.name || ""}
              meta={result.year || result.job || ""}
              subheading={(genres as string[]) || []}
              key={result.id}
            />
          );
        })}

      <button
        data-result-all
        type="button"
        onClick={handleAllResults}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAllResults();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            onPanelOpen(false);
          }
        }}
        className="p-2 hover:bg-gray-600/20 duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400"
      >
        See all results...
      </button>
    </div>
  );
};

export default ResultPanel;

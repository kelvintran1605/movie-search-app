import type { SearchMulti, SearchOption } from "@/types/movie";
import ResultItem from "./ResultItem";
import { mapMovieGenres } from "@/lib/tmdb.mapper";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const ResultPanel = ({
  isLoading,
  onPanelOpen,
  results = [],
  option,
  query,
}: {
  onPanelOpen: (state: boolean) => void;
  results?: SearchMulti[];
  option: SearchOption;
  query: string;
  isLoading: boolean;
}) => {
  const navigate = useNavigate();

  const handleAllResults = () => {
    onPanelOpen(false);
    navigate(
      `/search?query=${encodeURIComponent(query)}&option=${option}&page=1`,
    );
  };

  const topResults = [...results]
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 7);

  return (
    <div
      role="listbox"
      className="w-full min-h-[120px] absolute dark:bg-[#1A1A1A] top-full rounded-md shadow-lg border border-white/10"
    >
      {isLoading ? (
        <div className="w-full h-[120px] flex items-center justify-center">
          <Loader className="animate-spin size-8 text-gray-400" />
        </div>
      ) : topResults.length === 0 ? (
        <div className="w-full h-[120px] flex items-center justify-center text-gray-400 text-sm">
          No results found
        </div>
      ) : (
        <>
          {topResults.map((result, index) => {
            const genres = result?.genres?.map((genre) =>
              mapMovieGenres(genre),
            );
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
            className="p-2 text-sm text-yellow-400 hover:bg-white/10 duration-150 w-full text-left"
          >
            See all results…
          </button>
        </>
      )}
    </div>
  );
};

export default ResultPanel;

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
    navigate(`/search?query=${query}&option=${option}&page=1`);
    console.log("Button clicked");
  };
  return (
    <div className="w-full min-h-120 absolute dark:bg-[#1A1A1A] top-full rounded-md">
      {[...results]
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 7)
        .map((result) => {
          const genres = result?.genres?.map((genre) => mapMovieGenres(genre));
          return (
            <ResultItem
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
      <div
        onMouseDown={handleAllResults}
        className="p-2 hover:bg-gray-600/20 duration-150 cursor-pointer"
      >
        See all results...
      </div>
    </div>
  );
};

export default ResultPanel;

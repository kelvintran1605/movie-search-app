import type { SearchMulti } from "@/types/movie";
import ResultItem from "./ResultItem";
import { mapMovieGenres } from "@/lib/tmdb.mapper";

const ResultPanel = ({ results = [] }: { results?: SearchMulti[] }) => {
  return (
    <div className="w-full min-h-120 absolute dark:bg-[#1A1A1A] top-full rounded-md">
      {results.slice(0, 7).map((result) => {
        const genres = result?.genres?.map((genre) => mapMovieGenres(genre));
        return (
          <ResultItem
            url={result.url}
            title={result.title || ""}
            meta={result.year || ""}
            subheading={genres || []}
            key={result.id}
          />
        );
      })}
      <div className="p-2 hover:bg-gray-600/20 duration-150 cursor-pointer">
        See all results...
      </div>
    </div>
  );
};

export default ResultPanel;

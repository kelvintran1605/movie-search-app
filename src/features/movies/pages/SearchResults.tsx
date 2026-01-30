import { Link, useSearchParams } from "react-router-dom";
import { useGetSearchMovieQuery } from "@/services/moviesApiSlice";
import { useGetPersonDetailQuery } from "@/services/personApiSlice";
import type {
  SearchMovie,
  SearchMulti,
  SearchOption,
  SearchPerson,
  SearchTv,
} from "@/types/movie";
import PaginationBar from "../components/PaginationBar";

type SearchResult = SearchMovie | SearchTv | SearchPerson | SearchMulti;

const SearchResults = () => {
  // Read query params from URL: /search?query=...&option=...
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const option = (searchParams.get("option") ?? "multi") as SearchOption;

  // Get & Set page, default is 1:
  const page = Number(searchParams.get("page")) || 1;

  const handlePageChange = (nextPage: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(nextPage));
    setSearchParams(sp);
  };

  // Fetch search data (RTK Query)
  const { data, isFetching, isError } = useGetSearchMovieQuery(
    { query, option, page },
    { skip: query.trim() === "" },
  );

  // Ensure we always have an array
  const results = (data?.results ?? []) as SearchResult[];

  return (
    <div className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-12">
      <h1 className="font-bold text-xl sm:text-2xl">
        Showing matches for{" "}
        <span className="text-cyan-400 break-words">"{query}"</span>
      </h1>

      {query.trim() === "" && (
        <div className="text-gray-400 mt-3">Type something to search.</div>
      )}

      {isFetching && <div className="text-gray-400 mt-3">Loading...</div>}

      {isError && (
        <div className="text-red-400 mt-3">Something went wrong.</div>
      )}

      {!isFetching && query.trim() !== "" && (
        <>
          {option === "multi" && (
            <div className="mt-6 flex flex-col gap-8 sm:gap-10">
              <ResultSection sectionName="Multi" results={results} />
            </div>
          )}

          {option !== "multi" && (
            <div className="mt-6">
              <ResultSection sectionName="Results" results={results} />
            </div>
          )}

          <div className="mt-8 sm:mt-10">
            <PaginationBar
              currentPage={page}
              totalPages={data?.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

const ResultSection = ({
  sectionName,
  results,
}: {
  sectionName: string;
  results: SearchResult[];
}) => {
  return (
    <div className="w-full">
      <h2 className="font-bold text-lg sm:text-xl border-l-4 border-amber-500 pl-2">
        {sectionName}
      </h2>

      {results.length === 0 ? (
        <div className="text-gray-400 mt-3">No results.</div>
      ) : (
        <div className="flex flex-col gap-3 sm:gap-4 w-full rounded-md mt-4">
          {results.map((result) => (
            <ResultCard
              key={`${getMediaType(result)}-${result.id}`}
              result={result}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ResultCard = ({ result }: { result: SearchResult }) => {
  const isPersonResult = isPerson(result);

  const { data: personDetail } = useGetPersonDetailQuery(result.id, {
    skip: !isPersonResult,
  });

  const title = getDisplayTitle(result);
  const subtitle = getDisplayYearOrJob(result);
  const overview = getOverview(result, personDetail?.biography);
  const link = buildDetailLink(result);
  const imgSrc = (result as any).url as string | undefined;

  return (
    <Link
      to={link}
      className="
        flex items-start
        gap-4
        p-3 sm:p-4
        bg-[#0D0D0D]
        border border-white/10
        rounded-xl
        shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_40px_rgba(255,255,255,0.08)]
      "
    >
      {/* Image LEFT */}
      <div className="w-[90px] sm:w-[100px] md:w-[110px] shrink-0">
        <div className="w-full aspect-[2/3] overflow-hidden rounded-xl bg-white/5">
          {imgSrc ? (
            <img
              className="w-full h-full object-cover"
              src={imgSrc}
              alt={title}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No image
            </div>
          )}
        </div>
      </div>

      {/* Text RIGHT */}
      <div className="min-w-0 flex-1">
        <div
          className="
            font-bold
            text-base sm:text-lg
            hover:text-cyan-400 duration-150
            line-clamp-1
          "
          title={title}
        >
          {title}
        </div>

        <div className="text-gray-400 mb-2 sm:mb-3 text-sm">{subtitle}</div>

        <div className="text-gray-300 text-sm sm:text-base line-clamp-2 sm:line-clamp-3">
          {overview}S
        </div>
      </div>
    </Link>
  );
};

function getMediaType(r: SearchResult): "movie" | "tv" | "person" {
  if ("media_type" in r && (r as any).media_type) return (r as any).media_type;
  if ("job" in r) return "person";
  if ("title" in r) return "movie";
  if ("name" in r) return "tv";
  return "movie";
}

function isPerson(r: SearchResult): r is SearchPerson {
  return getMediaType(r) === "person";
}

const getDisplayTitle = (r: SearchResult) => {
  if ("title" in r && typeof r.title === "string" && r.title.trim() !== "") {
    return r.title;
  }
  if ("name" in r && typeof r.name === "string" && r.name.trim() !== "") {
    return r.name;
  }
  return "Untitled";
};

const getDisplayYearOrJob = (r: SearchResult) => {
  if ("year" in r && typeof (r as any).year === "string" && (r as any).year) {
    return (r as any).year;
  }

  if ("job" in r && typeof (r as any).job === "string" && (r as any).job) {
    return (r as any).job;
  }

  if ("release_date" in r && typeof (r as any).release_date === "string") {
    return (r as any).release_date.slice(0, 4) || "N/A";
  }
  if ("first_air_date" in r && typeof (r as any).first_air_date === "string") {
    return (r as any).first_air_date.slice(0, 4) || "N/A";
  }

  return "N/A";
};

const getOverview = (r: SearchResult, personBio?: string) => {
  if ("overview" in r && typeof (r as any).overview === "string") {
    const ov = (r as any).overview.trim();
    return ov !== "" ? ov : "N/A";
  }

  if (isPerson(r)) {
    const bio = (personBio ?? "").trim();
    return bio !== "" ? bio : "N/A";
  }

  return "N/A";
};

function buildDetailLink(r: SearchResult) {
  const mt = getMediaType(r);

  if (mt === "movie") return `/movie/${r.id}`;
  if (mt === "tv") return `/tv/${r.id}`;
  return `/person/${r.id}`;
}

export default SearchResults;

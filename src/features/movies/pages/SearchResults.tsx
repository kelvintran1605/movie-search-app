// SearchResults.tsx
// Full working example that supports Movie / TV / Person (including "multi").
// Comments are in English, as you asked.

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
import { useState } from "react";
import PaginationBar from "../components/PaginationBar";

// A convenient union type for anything that can appear in search results.
// (Depending on your definitions, SearchMulti might already include Movie/Tv/Person,
// but this union keeps it safe.)
type SearchResult = SearchMovie | SearchTv | SearchPerson | SearchMulti;

const SearchResults = () => {
  // Read query params from URL: /search?query=...&option=...
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";
  const option = (searchParams.get("option") ?? "multi") as SearchOption;

  // Get & Set page, default is 1:
  const page = Number(searchParams.get("page"));

  const handlePageChange = (nextPage: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("page", String(nextPage));
    setSearchParams(sp);
  };

  // Fetch search data (RTK Query)
  const { data, isFetching, isError } = useGetSearchMovieQuery(
    { query, option, page },
    // If query is empty, skip calling the API (optional UX improvement)
    { skip: query.trim() === "" }
  );

  // Ensure we always have an array
  const results = (data?.results ?? []) as SearchResult[];

  // If you use TMDB multi-search, results usually include media_type.
  // We categorize for "multi" option.
  const movies = results.filter(isMovie);
  const tvs = results.filter(isTv);
  const people = results.filter(isPerson);

  return (
    <div className="py-12 px-16">
      <h1 className="font-bold text-2xl">Showing matches for "{query}"</h1>

      {query.trim() === "" && (
        <div className="text-gray-400 mt-3">Type something to search.</div>
      )}

      {isFetching && <div className="text-gray-400 mt-3">Loading...</div>}

      {isError && (
        <div className="text-red-400 mt-3">Something went wrong.</div>
      )}

      {!isFetching && query.trim() !== "" && (
        <>
          {/* MULTI: show 3 sections */}
          {option === "multi" && (
            <div className="mt-6 flex flex-col gap-10">
              <ResultSection sectionName="Multi" results={results} />
            </div>
          )}

          {/* If you have separate options (movie/tv/person), show one section */}
          {option !== "multi" && (
            <div className="mt-6">
              <ResultSection sectionName="Results" results={results} />
            </div>
          )}

          <PaginationBar
            currentPage={page}
            totalPages={data?.total_pages}
            onPageChange={handlePageChange}
          />
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
      {/* Section Title */}
      <h2 className="font-bold text-xl border-l-4 border-amber-500 pl-2">
        {sectionName}
      </h2>

      {results.length === 0 ? (
        <div className="text-gray-400 mt-3">No results.</div>
      ) : (
        <div className="flex flex-col gap-4 w-full rounded-md mt-4">
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
  // IMPORTANT:
  // Hooks must be called inside a React component (NOT inside helper functions).
  // We only fetch person detail (biography) when the result is a person.
  const isPersonResult = isPerson(result);

  const { data: personDetail } = useGetPersonDetailQuery(result.id, {
    skip: !isPersonResult,
  });

  const title = getDisplayTitle(result);
  const subtitle = getDisplayYearOrJob(result);
  const overview = getOverview(result, personDetail?.biography);

  // Build a route based on media_type
  const link = buildDetailLink(result);

  return (
    <div className="flex gap-5 p-3 items-center bg-[#0D0D0D] border border-white/10 rounded-xl shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_12px_40px_rgba(255,255,255,0.08)]">
      {/* Use optional chaining in case url is missing */}
      <img
        className="w-20 rounded-xl h-30 object-cover"
        src={(result as any).url}
        alt={title}
      />

      <div>
        <Link
          to={link}
          className="font-bold hover:text-cyan-400 duration-150 cursor-pointer"
        >
          {title}
        </Link>

        <div className="text-gray-400 mb-3">{subtitle}</div>

        <div className="text-gray-300 line-clamp-2">{overview}</div>
      </div>
    </div>
  );
};

/* =========================
   Type Guards (Safe Filters)
   ========================= */

// Return media_type if it exists; fallback to "movie" if your single-search doesn’t provide it.
function getMediaType(r: SearchResult): "movie" | "tv" | "person" {
  if ("media_type" in r && (r as any).media_type) return (r as any).media_type;
  // Fallback guesses (optional)
  if ("title" in r) return "movie";
  if ("name" in r) return "tv";
  return "movie";
}

function isMovie(r: SearchResult): r is SearchMovie {
  return getMediaType(r) === "movie";
}

function isTv(r: SearchResult): r is SearchTv {
  return getMediaType(r) === "tv";
}

function isPerson(r: SearchResult): r is SearchPerson {
  return getMediaType(r) === "person";
}

/* =========================
   Display Helpers (No Hooks)
   ========================= */

const getDisplayTitle = (r: SearchResult) => {
  // Movie usually has "title"
  if ("title" in r && typeof r.title === "string" && r.title.trim() !== "") {
    return r.title;
  }

  // TV/Person usually has "name"
  if ("name" in r && typeof r.name === "string" && r.name.trim() !== "") {
    return r.name;
  }

  return "Untitled";
};

const getDisplayYearOrJob = (r: SearchResult) => {
  // If you already have a "year" field in your transformed types, use it.
  if ("year" in r && typeof (r as any).year === "string" && (r as any).year) {
    return (r as any).year;
  }

  // If you have "job" for certain types, show it.
  if ("job" in r && typeof (r as any).job === "string" && (r as any).job) {
    return (r as any).job;
  }

  // Optional: infer year from release_date/first_air_date if your types include them
  if ("release_date" in r && typeof (r as any).release_date === "string") {
    return (r as any).release_date.slice(0, 4) || "N/A";
  }
  if ("first_air_date" in r && typeof (r as any).first_air_date === "string") {
    return (r as any).first_air_date.slice(0, 4) || "N/A";
  }

  return "N/A";
};

const getOverview = (r: SearchResult, personBio?: string) => {
  // Movie/TV overview
  if ("overview" in r && typeof (r as any).overview === "string") {
    const ov = (r as any).overview.trim();
    return ov !== "" ? ov : "N/A";
  }

  // Person biography (fetched separately)
  if (isPerson(r)) {
    const bio = (personBio ?? "").trim();
    return bio !== "" ? bio : "N/A";
  }

  return "N/A";
};

/* =========================
   Link Builder
   ========================= */

function buildDetailLink(r: SearchResult) {
  const mt = getMediaType(r);

  if (mt === "movie") return `/movie/${r.id}`;
  if (mt === "tv") return `/tv/${r.id}`;
  return `/person/${r.id}`;
}

export default SearchResults;

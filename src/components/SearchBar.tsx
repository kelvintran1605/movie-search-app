import { FiLayers } from "react-icons/fi";
import { MdKeyboardArrowDown, MdOutlineMovie, MdClear } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaPerson } from "react-icons/fa6";
import { IoTvOutline } from "react-icons/io5";
import { useEffect, useMemo, useRef, useState } from "react";
import { useGetSearchMovieQuery } from "@/services/moviesApiSlice";
import type { SearchOption } from "@/types/movie";
import ResultPanel from "./ResultPanel";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isOpen = true }: { isOpen?: boolean }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [_, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem("recentSearches") || "[]"),
  );

  const optionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const options = useMemo(
    () => [
      { name: "All", value: "multi", icon: <FiLayers /> },
      { name: "Movie", value: "movie", icon: <MdOutlineMovie /> },
      { name: "Person", value: "person", icon: <FaPerson /> },
      { name: "TV", value: "tv", icon: <IoTvOutline /> },
    ],
    [],
  );

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const { data } = useGetSearchMovieQuery(
    { query: submittedQuery, option: selectedOption.value as SearchOption },
    { skip: submittedQuery.trim().length < 1 },
  );

  useEffect(() => {
    const timer = setTimeout(() => setSubmittedQuery(query.trim()), 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!optionRef.current?.contains(e.target as Node))
        setIsOptionsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const goSearch = (q: string) => {
    navigate(
      `/search?query=${encodeURIComponent(q)}&option=${selectedOption.value}&page=1`,
    );
    const stored: string[] = JSON.parse(
      localStorage.getItem("recentSearches") || "[]",
    );
    const next = [q, ...stored.filter((x) => x !== q)].slice(0, 8);
    localStorage.setItem("recentSearches", JSON.stringify(next));
    setRecentSearches(next);
  };

  return (
    <div
      ref={wrapperRef}
      onBlur={(e) => {
        const next = (e.relatedTarget as Node) || null;

        // If focus switches to the elements inside SearchBar (panel, button,...) => don't close it
        if (next && e.currentTarget.contains(next)) return;

        setIsPanelOpen(false);
        setIsOptionsOpen(false);
      }}
      className={`${isOpen ? "flex mr-7" : "hidden"} relative h-10 w-full md:w-[260px] lg:w-[620px] rounded-md md:flex duration-200 group border border-gray-300 hover:border-indigo-500 focus-within:border-indigo-500 bg-white text-slate-900 dark:bg-[#0D0D0D] dark:text-white dark:border-white/15 dark:hover:border-white/25 dark:focus-within:border-[#60A5FA]`}
    >
      {isPanelOpen && query.length > 1 && (
        <ResultPanel
          query={query}
          onPanelOpen={() => setIsPanelOpen(false)}
          option={selectedOption.value as SearchOption}
          results={data?.results}
        />
      )}

      <div ref={optionRef} className="w-2/5">
        <button
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          aria-controls="search-option-list"
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className="cursor-pointer flex justify-between w-full h-full items-center border-r border-gray-200 px-2 duration-150 hover:bg-indigo-500/10 dark:border-white/10 dark:hover:bg-white/10"
        >
          <div className="flex gap-2 items-center text-slate-700 dark:text-gray-200">
            {selectedOption.icon} {selectedOption.name}
          </div>
          <MdKeyboardArrowDown />
        </button>

        {isOptionsOpen && (
          <div
            role="listbox"
            className="absolute top-full mt-2 py-2 flex flex-col w-1/3 rounded-md z-40 bg-white text-slate-900 border border-gray-200 shadow-xl dark:bg-[#1A1A1A] dark:text-white dark:border-white/10"
          >
            {options.map((option) => (
              <button
                role="option"
                aria-selected={selectedOption.value === option.value}
                type="button"
                key={option.value}
                onClick={() => {
                  setSelectedOption(option);
                  setIsOptionsOpen(false);
                }}
                className="flex gap-3 items-center text-sm sm:text-md cursor-pointer py-2 hover:bg-slate-100 dark:hover:bg-white/10 px-3"
              >
                {option.icon} {option.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        aria-label="Search"
        aria-controls="search-results"
        aria-expanded={isPanelOpen}
        data-search-input
        onFocus={() => setIsPanelOpen(true)}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        value={query}
        className="w-full pl-3 pr-12 outline-none bg-transparent placeholder:text-slate-500 dark:placeholder:text-gray-400"
        type="text"
        placeholder="Search movies, TV shows, people..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim()) goSearch(query.trim());

          if (e.key === "ArrowDown" && isPanelOpen) {
            e.preventDefault();
            const first =
              wrapperRef.current?.querySelector<HTMLButtonElement>(
                "[data-result-item]",
              );

            first?.focus();
          }

          if (e.key === "Escape") {
            setIsPanelOpen(false);
          }
        }}
      />

      <button
        type="button"
        onClick={() => query.trim() && goSearch(query.trim())}
        aria-label="Search"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl text-slate-600 hover:text-slate-900
             dark:text-gray-300 dark:hover:text-white
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
      >
        <CiSearch />
      </button>

      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          aria-label="Clear search"
          className="absolute right-10 top-1/2 -translate-y-1/2 text-xl text-slate-500 hover:text-slate-900
               dark:text-gray-300 dark:hover:text-white
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
        >
          <MdClear />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

import { FiLayers } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { MdClear } from "react-icons/md";
import { MdOutlineMovie } from "react-icons/md";
import { FaPerson } from "react-icons/fa6";
import { IoTvOutline } from "react-icons/io5";
import { useGetSearchMovieQuery } from "@/services/moviesApiSlice";
import type { SearchOption } from "@/types/movie";
import ResultPanel from "./ResultPanel";
import { Link, useNavigate } from "react-router-dom";
import { MdHistory } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

type RecentSearch = {};
const SearchBar = () => {
  // Open/Close state of UIs
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isPanelOpen, setPanelOpen] = useState(false);

  // Query/Debounce
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>(
    JSON.parse(localStorage.getItem("recentSearches") || "[]")
  );

  // Refs
  const optionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Search Options
  const options = useMemo(() => {
    return [
      {
        name: "All",
        value: "multi",
        icon: <FiLayers />,
      },
      {
        name: "Movie",
        value: "movie",
        icon: <MdOutlineMovie />,
      },
      {
        name: "Person",
        value: "person",
        icon: <FaPerson />,
      },
      {
        name: "TV",
        value: "tv",
        icon: <IoTvOutline />,
      },
    ];
  }, []);

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { data, isFetching } = useGetSearchMovieQuery(
    {
      query: submittedQuery,
      option: selectedOption.value as SearchOption,
    },
    { skip: submittedQuery.trim().length < 1 }
  );

  console.log(data);
  // Handling Functions
  const handleClearResult = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption(option);
    setIsOptionsOpen(false);
  };

  const handleClickItem = () => {
    setIsOptionsOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setSubmittedQuery(query.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  // Handle outside clicking of the options list.
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!optionRef.current?.contains(e.target as Node)) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const q = query.trim();
      if (!q) return;

      navigate(
        `/search?query=${encodeURIComponent(q)}&option=${selectedOption.value}&page=1`
      );

      const stored: string[] = JSON.parse(
        localStorage.getItem("recentSearches") || "[]"
      );

      const next = [q, ...stored.filter((x) => x !== q)].slice(0, 8);

      localStorage.setItem("recentSearches", JSON.stringify(next));
      setRecentSearches(next);
    }
  };

  const handleClickSearch = () => {
    const q = query.trim();
    if (!q) return;

    navigate(
      `/search?query=${encodeURIComponent(q)}&option=${selectedOption.value}&page=1`
    );

    const stored: string[] = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    const next = [q, ...stored.filter((x) => x !== q)].slice(0, 8);

    localStorage.setItem("recentSearches", JSON.stringify(next));
    setRecentSearches(next);
  };

  const handleRemoveSearch = (search: string) => {
    const stored: string[] = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );

    const next = stored.filter((query) => query !== search);

    localStorage.setItem("recentSearches", JSON.stringify(next));
    setRecentSearches(next);
  };

  return (
    <div className="relative border border-gray-500 h-10 w-160 rounded-md flex hover:border-indigo-500 duration-250 group focus-within:border-indigo-500">
      {/* Result Panel */}
      {isPanelOpen && query.length > 1 ? (
        <ResultPanel
          query={query}
          onPanelOpen={handleClickItem}
          option={selectedOption.value as SearchOption}
          results={data?.results}
        />
      ) : (
        // Recent Searches
        isPanelOpen && (
          <div className="w-full min-h-100 absolute dark:bg-[#1A1A1A] top-full rounded-md p-4">
            <div className="font-bold text-xl text-gray-300 mb-2">
              Recent Searches
            </div>
            {recentSearches.length === 0 ? (
              <div className="text-center text-gray-400 select-text">
                No recent searches
              </div>
            ) : (
              recentSearches.map((search) => (
                <div className="flex justify-between items-center px-1 py-2 w-full rounded-xl">
                  <div
                    onMouseDown={() => {
                      navigate(
                        `/search?query=${encodeURIComponent(search)}&option=${selectedOption.value}&page=1`
                      );
                    }}
                    className="flex items-center gap-2 flex-1 hover:bg-gray-300/20 px-2 py-1 rounded-xl duration-150 cursor-pointer"
                  >
                    <MdHistory className="text-xl" />
                    <span className="text-md font-bold">{search}</span>
                  </div>

                  <button
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveSearch(search);
                    }}
                    className="p-2 rounded-full hover:bg-gray-300/20 text-gray-500 duration-150 cursor-pointer"
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))
            )}
          </div>
        )
      )}

      <div ref={optionRef} className="w-2/5">
        <div
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          className="cursor-pointer flex justify-between w-full h-full items-center border-r border-gray-500 px-2 hover:bg-indigo-500/30 duration-250"
        >
          <div className="flex gap-2 items-center">
            {selectedOption.icon} {selectedOption.name}
          </div>
          <MdKeyboardArrowDown />
        </div>
        {/* Options */}
        {isOptionsOpen && (
          <div className="absolute top-full py-3 flex flex-col bg-[#1F1F1F] w-1/3">
            {options.map((option) => (
              <div
                onClick={() => handleSelectOption(option)}
                className="flex gap-4 items-center text-md cursor-pointer py-2 hover:bg-gray-400/20 px-3"
              >
                {option.icon}
                {option.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <input
        onFocus={() => setPanelOpen(true)}
        onBlur={() => setPanelOpen(false)}
        ref={inputRef}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        className="w-full pl-3 pr-5 outline-none"
        type="text"
        placeholder="Search movies, TV shows, people..."
        onKeyDown={handleKeyDown}
      />

      <CiSearch
        onClick={handleClickSearch}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer"
      />
      {query && (
        <MdClear
          onClick={handleClearResult}
          className="absolute right-10 cursor-pointer hover:opacity-60 duration-150 top-1/2 -translate-y-1/2 text-xl"
        />
      )}
    </div>
  );
};

export default SearchBar;

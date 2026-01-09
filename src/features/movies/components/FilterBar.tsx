import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import type { Filters } from "@/types/movie";
import { useGetAllLanguagesQuery } from "@/services/moviesApiSlice";
import {
  HiSortAscending as AscendingIcon,
  HiSortDescending as DescendingIcon,
} from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

type GenreOption = { name: string; value: number };

const FilterBar = ({ movieGenres }: { movieGenres: GenreOption[] }) => {
  const sortByOptions = [
    { name: "Popularity", value: "popularity" },
    { name: "Rating", value: "vote_average" },
    { name: "Release date", value: "primary_release_date" },
  ];

  const location = useLocation();
  const [sortByOrder, setSortByOrder] = useState("Descending");
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: languages = [] } = useGetAllLanguagesQuery();

  const [isSortByOpen, setSortByOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);

  const [draftGenreIds, setDraftGenreIds] = useState<number[]>(
    searchParams.get("genreIds")?.split(",").map(Number) || []
  );
  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [language, setLanguage] = useState<string>(
    searchParams.get("language") || ""
  );
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2025]);

  useEffect(() => {
    setDraftGenreIds(
      searchParams
        .get("genreIds")
        ?.split(",")
        .map(Number)
        .filter(Number.isFinite) || []
    );

    setLanguage(searchParams.get("language") || "");

    const year = searchParams.get("year");
    if (year) {
      const [minY, maxY] = year.split("-").map(Number);
      if (Number.isFinite(minY) && Number.isFinite(maxY)) {
        setYearRange([minY, maxY]);
      }
    } else {
      setYearRange([2000, 2025]);
    }

    const sort = searchParams.get("sortBy");
    if (sort) {
      const [field, dir] = sort.split(".");
      if (field) setSortBy(field);
      setSortByOrder(dir === "asc" ? "Ascending" : "Descending");
    } else {
      setSortBy(sortByOptions[0].value);
      setSortByOrder("Descending");
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleGenre = (id: number) => {
    setDraftGenreIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filtersToSearchParams = (filters: Filters) => ({
    genreIds: filters.genreIds.join(","),
    sortBy: filters.sortBy,
    language: filters.language,
    year: `${filters.yearRange[0]}-${filters.yearRange[1]}`,
  });

  const handleApplyFilter = (sp: Record<string, string>) => {
    setSearchParams(sp);
  };

  const activeFiltersCount =
    (sortBy !== sortByOptions[0].value ? 1 : 0) +
    (language !== "" ? 1 : 0) +
    (draftGenreIds.length > 0 ? 1 : 0) +
    (yearRange[0] !== 2000 || yearRange[1] !== 2025 ? 1 : 0);

  const fieldBg =
    "bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-gray-600";
  const menuBg =
    "bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-gray-600";
  const textPrimary = "text-slate-900 dark:text-gray-100";
  const textMuted = "text-slate-600 dark:text-gray-200";

  return (
    <div className="w-full h-fit flex flex-col gap-6 shadow-md overflow-visible border border-slate-200 dark:border-gray-600 p-4 rounded-xl bg-white/70 dark:bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col gap-4">
        <div
          className={`text-base flex items-center justify-between font-semibold ${textPrimary}`}
        >
          <span>Sort By</span>
          <div
            onClick={() =>
              setSortByOrder(
                sortByOrder === "Ascending" ? "Descending" : "Ascending"
              )
            }
            className="text-xl cursor-pointer hover:text-slate-500 dark:hover:text-gray-400 duration-150"
          >
            {sortByOrder === "Ascending" ? (
              <AscendingIcon />
            ) : (
              <DescendingIcon />
            )}
          </div>
        </div>

        <div
          onClick={() => setSortByOpen(!isSortByOpen)}
          className={`relative p-2 px-3 w-full text-left rounded-2xl text-base flex justify-between items-center cursor-pointer hover:border-slate-300 dark:hover:border-gray-500 duration-150 ${fieldBg} ${textPrimary}`}
        >
          <span className="truncate">
            {(sortByOptions.find((item) => item.value === sortBy)?.name ??
              "Popularity") + ` (${sortByOrder})`}
          </span>
          <ArrowDown
            className={`shrink-0 duration-250 ${isSortByOpen ? "rotate-180" : "rotate-0"}`}
          />

          <div
            className={`absolute left-0 top-full mt-2 max-h-0 text-base transition-all duration-250 w-full text-left rounded-2xl flex-col cursor-pointer overflow-hidden opacity-0 scale-95 ${
              isSortByOpen ? "opacity-100 scale-100 max-h-60" : ""
            } z-20 ${menuBg}`}
          >
            {sortByOptions.map((item) => (
              <div
                key={item.value}
                className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 duration-150"
                onClick={() => {
                  setSortBy(item.value);
                  setSortByOpen(false);
                }}
              >
                <span className={textPrimary}>{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`font-semibold ${textPrimary}`}>Genres</div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {movieGenres.map((item) => {
            const isSelected = draftGenreIds.includes(item.value);
            return (
              <div
                key={item.value}
                onClick={() => toggleGenre(item.value)}
                className={`px-3 py-2 cursor-pointer text-sm border rounded-full hover:scale-105 duration-200 select-none ${
                  isSelected
                    ? "bg-sky-500/80 border-sky-400 text-white"
                    : "bg-slate-50 dark:bg-[#1A1A1A] border-slate-200 dark:border-gray-600 text-slate-700 dark:text-gray-200 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <div className={`font-semibold ${textPrimary}`}>Language</div>
        <div
          onClick={() => setLanguageOpen(!isLanguageOpen)}
          className={`relative p-2 px-3 w-full text-left rounded-2xl text-base flex justify-between items-center cursor-pointer hover:border-slate-300 dark:hover:border-gray-500 duration-150 ${fieldBg} ${textPrimary}`}
        >
          <span className="truncate">
            {languages.find((item) => item.iso_639_1 === language)
              ?.english_name ?? "None Selected"}
          </span>
          <ArrowDown
            className={`shrink-0 duration-250 ${isLanguageOpen ? "rotate-180" : "rotate-0"}`}
          />

          <div
            className={`absolute left-0 top-full mt-2 overflow-auto max-h-0 text-base transition-all duration-250 w-full text-left rounded-2xl flex-col cursor-pointer opacity-0 scale-95 ${
              isLanguageOpen ? "opacity-100 scale-100 max-h-60" : ""
            } z-20 ${menuBg}`}
          >
            {languages.map((item) => (
              <div
                key={item.english_name}
                className="p-2 hover:bg-slate-100 dark:hover:bg-gray-600 duration-150"
                onClick={() => {
                  setLanguage(item.iso_639_1);
                  setLanguageOpen(false);
                }}
              >
                <span className={textPrimary}>{item.english_name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`font-semibold ${textPrimary}`}>Release Year</div>
        <div>
          {location.pathname === "/movies/now-playing" ? (
            <div className="font-bold text-sky-600 dark:text-cyan-400">
              2025
            </div>
          ) : (
            <div>
              <Slider.Root
                value={yearRange}
                onValueChange={(v) => setYearRange(v as [number, number])}
                className="relative flex items-center select-none touch-none w-full h-6"
                defaultValue={[2000, 2025]}
                min={1950}
                max={2025}
                step={1}
              >
                <Slider.Track className="bg-slate-200 dark:bg-gray-700 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-sky-500 dark:bg-sky-400 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-slate-100 rounded-full shadow hover:scale-110 transition" />
                <Slider.Thumb className="block w-4 h-4 bg-white dark:bg-slate-100 rounded-full shadow hover:scale-110 transition" />
              </Slider.Root>

              <div className={`text-xs mt-2 flex justify-between ${textMuted}`}>
                <span>{yearRange[0]}</span>
                <span>{yearRange[1]}</span>
              </div>
            </div>
          )}

          <button
            onClick={() =>
              handleApplyFilter(
                filtersToSearchParams({
                  genreIds: draftGenreIds,
                  sortBy:
                    sortBy + (sortByOrder === "Ascending" ? ".asc" : ".desc"),
                  language,
                  yearRange,
                })
              )
            }
            className="bg-sky-500 dark:bg-sky-400 text-white dark:text-slate-900 w-full p-3 rounded-3xl mt-8 sm:mt-10 cursor-pointer hover:opacity-90 hover:scale-[1.02] duration-150 font-semibold"
          >
            Apply Filters
            {activeFiltersCount > 0 ? ` (${activeFiltersCount})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

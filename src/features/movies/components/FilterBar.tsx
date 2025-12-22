import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";
import * as Slider from "@radix-ui/react-slider";
import type { Filters } from "../pages/PopularMovies";
import { useGetAllLanguagesQuery } from "@/services/moviesApiSlice";
import {
  HiSortAscending as AscendingIcon,
  HiSortDescending as DescendingIcon,
} from "react-icons/hi";

type GenreOption = { name: string; value: number };

const FilterBar = ({
  movieGenres,
  onApply,
}: {
  movieGenres: GenreOption[];
  onApply: (filters: Filters) => void;
}) => {
  const sortByOptions = [
    { name: "Popularity", value: "popularity" },
    { name: "Rating", value: "vote_average" },
    { name: "Release date", value: "primary_release_date" },
  ];

  const [sortByOrder, setSortByOrder] = useState("Descending");

  const { data: languages = [] } = useGetAllLanguagesQuery();

  const [isSortByOpen, setSortByOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [draftGenreIds, setDraftGenreIds] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [language, setLanguage] = useState<string>("");
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2025]);

  const toggleGenre = (id: number) => {
    setDraftGenreIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const activeFiltersCount =
    (sortBy !== sortByOptions[0].value ? 1 : 0) +
    (language !== "" ? 1 : 0) +
    (draftGenreIds.length > 0 ? 1 : 0) +
    (yearRange[0] !== 2000 || yearRange[1] !== 2025 ? 1 : 0);

  return (
    <div className="w-[20%] h-fit flex flex-col gap-6 text-white shadow-md overflow-hidden border border-gray-600 p-4 rounded-xl">
      <div className="flex flex-col gap-4">
        <div className="text-base flex items-center justify-between font-semibold text-gray-100">
          <span>Sort By</span>
          <div
            onClick={() =>
              setSortByOrder(
                sortByOrder === "Ascending" ? "Descending" : "Ascending"
              )
            }
            className="text-xl cursor-pointer hover:text-gray-400 duration-150"
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
          className="relative border-gray-600 border p-2 px-3 bg-[#1A1A1A] w-full text-left rounded-2xl text-base flex justify-between items-center cursor-pointer hover:border-gray-500 duration-150"
        >
          <span>
            {(sortByOptions.find((item) => item.value === sortBy)?.name ??
              "Popularity") + ` (${sortByOrder})`}
          </span>
          <ArrowDown
            className={`duration-250 ${isSortByOpen ? "rotate-180" : "rotate-0"}`}
          />

          <div
            className={`absolute left-0 top-1/2 translate-y-5 max-h-0 text-base transition-all duration-250 border bg-[#1A1A1A] w-full text-left rounded-2xl flex-col cursor-pointer overflow-hidden opacity-0 scale-95 ${
              isSortByOpen
                ? "opacity-100 scale-100 max-h-60 border-gray-600"
                : "border-transparent"
            } mt-2 z-10`}
          >
            {sortByOptions.map((item) => (
              <div
                key={item.value}
                className="p-2 hover:bg-gray-600 duration-150"
                onClick={() => {
                  setSortBy(item.value);
                  setSortByOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        <div>Genres</div>
        <div className="flex flex-wrap gap-4">
          {movieGenres.map((item) => {
            const isSelected = draftGenreIds.includes(item.value);
            return (
              <div
                key={item.value}
                onClick={() => toggleGenre(item.value)}
                className={`bg-[#1A1A1A] ${
                  isSelected ? "bg-[#60A5FA]/80" : ""
                } text-gray-200 p-2 cursor-pointer text-sm border border-gray-600 rounded-full hover:scale-105 hover:text-white duration-250`}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <div>Language</div>
        <div
          onClick={() => setLanguageOpen(!isLanguageOpen)}
          className="relative border-gray-600 border p-2 px-3 bg-[#1A1A1A] w-full text-left rounded-2xl text-base flex justify-between items-center cursor-pointer hover:border-gray-500 duration-150"
        >
          <span>
            {languages.find((item) => item.iso_639_1 === language)
              ?.english_name ?? "None Selected"}
          </span>
          <ArrowDown
            className={`duration-250 ${
              isLanguageOpen ? "rotate-180" : "rotate-0"
            }`}
          />

          <div
            className={`absolute left-0 top-1/2 translate-y-5 overflow-scroll max-h-0 text-base transition-all duration-250 border bg-[#1A1A1A] w-full text-left rounded-2xl flex-col cursor-pointer opacity-0 scale-95 ${
              isLanguageOpen
                ? "opacity-100 scale-100 max-h-60 border-gray-600"
                : "border-transparent"
            } mt-2 z-10`}
          >
            {languages.map((item) => (
              <div
                key={item.english_name}
                className="p-2 hover:bg-gray-600 duration-150"
                onClick={() => {
                  setLanguage(item.iso_639_1);
                  setLanguageOpen(false);
                }}
              >
                {item.english_name}
              </div>
            ))}
          </div>
        </div>

        <div>Release Year</div>
        <div>
          <Slider.Root
            value={yearRange}
            onValueChange={(v) => setYearRange(v as [number, number])}
            className="relative flex items-center select-none touch-none w-full h-5"
            defaultValue={[2000, 2025]}
            min={1950}
            max={2025}
            step={1}
          >
            <Slider.Track className="bg-gray-700 relative grow rounded-full h-1">
              <Slider.Range className="absolute bg-[#60A5FA] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow hover:scale-110 transition" />
            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow hover:scale-110 transition" />
          </Slider.Root>

          <div className="text-xs text-gray-200 mt-1 flex justify-between">
            <span>{yearRange[0]}</span>
            <span>{yearRange[1]}</span>
          </div>

          <button
            onClick={() =>
              onApply({
                genreIds: draftGenreIds,
                sortBy:
                  sortBy + (sortByOrder === "Ascending" ? ".asc" : ".desc"),
                language,
                yearRange,
              })
            }
            className="bg-[#60A5FA] w-full p-2 rounded-3xl mt-10 cursor-pointer hover:opacity-90 hover:scale-105 duration-150"
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

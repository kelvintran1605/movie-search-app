import { CiSearch as SearchIcon } from "react-icons/ci";
import { MdKeyboardArrowDown as ArrowDown } from "react-icons/md";
import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

const FilterBar = () => {
  const [isSortByOpen, setSortByOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const sortByOptions = [
    {
      name: "Popularity",
      value: "popularity",
    },
    {
      name: "Rating",
      value: "rating",
    },
    {
      name: "Release date",
      value: "release-date",
    },
    {
      name: "Trending",
      value: "trending",
    },
  ];
  const languages = [
    {
      name: "None Selected",
      value: "none",
    },
    {
      name: "English",
      value: "english",
    },
    {
      name: "French",
      value: "french",
    },
    {
      name: "others",
      value: "other",
    },
  ];
  const moviesGenres = [
    { name: "Action", value: "action" },
    { name: "Adventure", value: "adventure" },
    { name: "Animation", value: "animation" },
    { name: "Comedy", value: "comedy" },
    { name: "Crime", value: "crime" },
    { name: "Documentary", value: "documentary" },
    { name: "Drama", value: "drama" },
    { name: "Fantasy", value: "fantasy" },
    { name: "Horror", value: "horror" },
    { name: "Mystery", value: "mystery" },
    { name: "Romance", value: "romance" },
    { name: "Sci-Fi", value: "sci-fi" },
    { name: "Thriller", value: "thriller" },
    { name: "Western", value: "western" },
  ];
  const [sortBy, setSortBy] = useState(sortByOptions[0].value);
  const [language, setLanguage] = useState(languages[0].value);
  const [genres, setGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState([2000, 2025]);
  const [searchValue, setSearchValue] = useState("");
  const handleGenres = (value: string) => {
    setGenres(
      (prev) =>
        prev.includes(value)
          ? prev.filter((g) => g !== value)
          : [...prev, value] //
    );
  };
  return (
    <div className="w-[20%] h-fit flex flex-col gap-6 text-white shadow-md overflow-hidden border border-gray-600 p-4 rounded-xl">
      {/* Input to search movies */}
      <div className="flex items-center gap-2 w-full border-gray-600 p-2 border rounded-2xl text-base bg-[#1A1A1A]">
        <SearchIcon className="text-xl" />
        <input
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          className="w-full focus:outline-none"
          placeholder="Enter movie names, genres..."
          type="text"
        />
      </div>

      {/* Sort by options */}
      <div className="flex flex-col gap-4">
        <div className="text-base font-semibold text-gray-100">Sort By</div>
        <div
          onClick={() => setSortByOpen(!isSortByOpen)}
          className="relative border-gray-600 border p-2 px-3 bg-[#1A1A1A] w-full text-left rounded-2xl text-base flex justify-between items-center
        cursor-pointer hover:border-gray-500 duration-150"
        >
          <span>
            {sortByOptions.find((item) => item.value === sortBy)?.name ??
              "Popularity"}
          </span>
          <ArrowDown
            className={`duration-250 ${isSortByOpen ? "rotate-180" : "rotate-0"}`}
          />
          <div
            className={`absolute left-0 top-1/2 translate-y-5 max-h-0 text-base transition-all duration-250 border bg-[#1A1A1A] w-full text-left rounded-2xl flex-col cursor-pointer overflow-hidden
            opacity-0 scale-95 ${isSortByOpen ? "opacity-100 scale-100 max-h-60 border-gray-600" : "border-transparent"} mt-2 z-10
          `}
          >
            {sortByOptions.map((item) => (
              <div
                className="p-2 hover:bg-gray-600 duration-150"
                onClick={() => {
                  setSortBy(item.value);
                  setSortByOpen(!isSortByOpen);
                }}
                key={item.value}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Genres option */}
        <div>Genres</div>
        <div className="flex flex-wrap gap-4">
          {moviesGenres.map((item) => (
            <div
              onClick={() => handleGenres(item.value)}
              className={`bg-[#1A1A1A] ${genres.includes(item.value) && "bg-[#60A5FA]/80"} text-gray-200 p-2 cursor-pointer text-sm border border-gray-600 rounded-full hover:scale-105 hover:text-white duration-250`}
              key={item.value}
            >
              {item.name}
            </div>
          ))}
        </div>
        {/* Language */}
        <div>Language</div>
        <div>
          <div
            onClick={() => setLanguageOpen(!isLanguageOpen)}
            className="relative border-gray-600 border p-2 px-3 bg-[#1A1A1A] w-full text-left rounded-2xl text-base flex justify-between items-center
        cursor-pointer hover:border-gray-500 duration-150"
          >
            <span>
              {languages.find((item) => item.value === language)?.name ??
                "None Selected"}
            </span>
            <ArrowDown
              className={`duration-250 ${isLanguageOpen ? "rotate-180" : "rotate-0"}`}
            />
            <div
              className={`absolute left-0 top-1/2 translate-y-5 max-h-0 text-base transition-all duration-250 border bg-[#1A1A1A] w-full text-left rounded-2xl flex-col cursor-pointer overflow-hidden
            opacity-0 scale-95
            ${isLanguageOpen ? "opacity-100 scale-100 max-h-60 border-gray-600" : "border-transparent"}
            mt-2 z-10
          `}
            >
              {languages.map((item) => (
                <div
                  onClick={() => {
                    setLanguage(item.value);
                    setLanguageOpen(!isLanguageOpen);
                  }}
                  className="p-2 hover:bg-gray-600 duration-150"
                  key={item.value}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Release Year */}
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

            {/* Thumb 1 */}
            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow hover:scale-110 transition" />

            {/* Thumb 2 */}
            <Slider.Thumb className="block w-4 h-4 bg-white rounded-full shadow hover:scale-110 transition" />
          </Slider.Root>

          <div className="text-xs text-gray-200 mt-1 flex justify-between">
            <span>{yearRange[0]}</span> <span>{yearRange[1]}</span>
          </div>

          {/* Apply Filter  */}
          <button className="bg-[#60A5FA] w-full p-2 rounded-3xl mt-10 cursor-pointer hover:opacity-90 hover:scale-105 duration-150 ">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;

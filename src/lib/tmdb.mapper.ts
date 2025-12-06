import type { MovieDetail, MovieSummary } from "../types/movie";
import type {
  TmdbConfig,
  TmdbMovieDetailWire,
  TmdbMovieSummaryWire,
} from "../types/tmdb.wire";

// Function to pick poster size
export const pickPosterSize = (cfg: TmdbConfig, fallback: string = "w342") => {
  const sizes = cfg.images.poster_sizes || [];
  // w342 will be prioritized, if we can't find it, pick a size from w300-500, then fallback
  return sizes.includes("w342")
    ? "w342"
    : (sizes.find((s) => /^w(3|5)\d{2}$/.test(s)) ?? fallback);
};

export const buildImageUrl = (
  cfg: TmdbConfig,
  filePath?: string,
  size?: string
) => {
  if (!filePath) return undefined;
  const chosen = size || pickPosterSize(cfg);
  const base = cfg.images.secure_base_url || cfg.images.base_url || "";
  return `${base}${chosen}${filePath}`;
};

const getTitle = (w: TmdbMovieSummaryWire) => {
  return w.name ?? w.title ?? "";
};

const getYear = (date?: string) => (date ? date?.slice(0, 4) : undefined);

export const mapTmdbSummary = (
  w: TmdbMovieSummaryWire,
  cfg: TmdbConfig
): MovieSummary => ({
  id: w.id,
  title: getTitle(w),
  year: getYear(w.release_date ?? w.first_air_date),
  imgUrl: buildImageUrl(cfg, w.poster_path, "w342"),
  rating: w.vote_average,
  overview: w.overview,
  mediaType: w.media_type ?? "movie",
});

export const mapTmdbDetail = (
  w: TmdbMovieDetailWire,
  cfg: TmdbConfig
): MovieDetail => ({
  ...mapTmdbSummary(w, cfg),
  genres: w.genres?.map((g) => ({ id: g.id, name: g.name })),
  runtime: w.runtime,
  spokenLanguages: w.spoken_languages?.map((l) => l.english_name) ?? [],
});

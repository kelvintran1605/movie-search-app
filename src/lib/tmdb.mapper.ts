import type {
  Cast,
  CastWire,
  Crew,
  CrewWire,
  PersonDetail,
  PersonDetailWire,
} from "@/types/person";
import type {
  MovieDetail,
  MovieSummary,
  RawSearchMovie,
  RawSearchPerson,
  RawSearchTv,
  SearchMovie,
  SearchPerson,
  SearchTv,
  TmdbCredit,
  TmdbMovieReview,
  TvDetail,
} from "../types/movie";
import type {
  TmdbConfig,
  TmdbCreditWire,
  TmdbMovieDetailWire,
  TmdbMovieSummaryWire,
  TmdbReviewWire,
  TmdbTvDetailWire,
} from "../types/tmdb.wire";
import { genres } from "./data";

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
  const fallback = "/cinema.jpg";
  if (!filePath) return fallback;

  const chosen = size || pickPosterSize(cfg);
  const base = cfg.images.secure_base_url || cfg.images.base_url || "";
  return `${base}${chosen}${filePath}`;
};

const getTitle = (w: TmdbMovieSummaryWire) => {
  return w.name ?? w.title ?? "";
};

const getYear = (date?: string) => (date ? date.slice(0, 4) : "N/A");

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
  genres: w.genre_ids,
  mediaType: w.media_type ?? "movie",
});

export const mapTmdbDetail = (
  w: TmdbMovieDetailWire,
  cfg: TmdbConfig
): MovieDetail => {
  return {
    id: w.id,
    title: w.title,
    year: getYear(w.release_date),
    imgUrl: buildImageUrl(cfg, w.poster_path, "w342"),
    backdropUrl: buildImageUrl(cfg, w.backdrop_path, "w1280"),
    rating: w.vote_average,
    overview: w.overview,
    genres: w.genres.map((g) => g.id),
    duration: w.runtime,
    spokenLanguage: w.spoken_languages,
    budget: w.budget,
    revenue: w.revenue,
    status: w.status,
  };
};

export const mapTmdbTvDetail = (
  w: TmdbTvDetailWire,
  cfg: TmdbConfig
): TvDetail => {
  return {
    id: w.id,
    name: w.name,
    genres: w.genres,
    airDate: getYear(w.first_air_date),
    overview: w.overview,
    rating: w.vote_average,
    status: w.status,
    spokenLanguages: w.spoken_languages,
    episodesCount: w.number_of_episodes,
    seasonsCount: w.number_of_seasons,
    posterUrl: buildImageUrl(cfg, w.poster_path),
    backdropUrl: buildImageUrl(cfg, w.backdrop_path, "w1280"),
  };
};

export const mapTmdbCredit = (
  w: TmdbCreditWire,
  cfg: TmdbConfig
): TmdbCredit => {
  const cast = w.cast.map((e) => ({
    id: e.id,
    name: e.name,
    character: e.character,
    profileUrl: buildImageUrl(cfg, e.profile_path ?? undefined, "w185"),
  }));

  const directorWire = w.crew.find((c) => c.job === "Director");

  const director = directorWire
    ? {
        id: directorWire.id,
        name: directorWire.name,
        job: directorWire.job,
        profileUrl: buildImageUrl(
          cfg,
          directorWire.profile_path ?? undefined,
          "w185"
        ),
      }
    : undefined;

  return {
    cast,
    director,
  };
};

export const mapTmdbReview = (
  w: TmdbReviewWire,
  cfg: TmdbConfig
): TmdbMovieReview => {
  return {
    name: w.author_details.name,
    profileUrl: buildImageUrl(cfg, w.author_details.avatar_path, "w92"),
    rating: w.author_details.rating,
    content: w.content,
    createdTime: new Date(w.created_at).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
};

const DEPARTMENT_TO_JOB: Record<string, string> = {
  Acting: "Actor",
  Directing: "Director",
  Writing: "Writer",
  Production: "Producer",
  Sound: "Sound Designer",
  Camera: "Cinematographer",
  Art: "Art Director",
  Editing: "Editor",
  Costume: "Costume Designer",
  VisualEffects: "VFX Artist",
};

export const getJobTitleFromDepartment = (department?: string | null) => {
  if (!department) return "Unknown";
  return DEPARTMENT_TO_JOB[department] ?? department;
};

export const mapSearchMovie = (
  rawSearchMovie: RawSearchMovie,
  config: TmdbConfig
): SearchMovie => {
  return {
    title: rawSearchMovie.title || rawSearchMovie.original_name,
    id: rawSearchMovie.id,
    genres: rawSearchMovie.genre_ids,
    year: getYear(rawSearchMovie.release_date),
    popularity: rawSearchMovie.popularity,
    url: buildImageUrl(config, rawSearchMovie.poster_path, "w92"),
    media_type: rawSearchMovie.media_type,
    overview: rawSearchMovie.overview,
  };
};

export const mapSearchPerson = (
  rawSearchPerson: RawSearchPerson,
  config: TmdbConfig
): SearchPerson => {
  return {
    name: rawSearchPerson.name,
    id: rawSearchPerson.id,
    job: getJobTitleFromDepartment(rawSearchPerson.known_for_department),
    popularity: rawSearchPerson.popularity,
    url: buildImageUrl(config, rawSearchPerson.profile_path),
    media_type: rawSearchPerson.media_type,
  };
};

export const mapMovieGenres = (genreId: number) => {
  return genres.find((genre) => genre.id === genreId)?.name;
};

export const mapSearchTv = (
  rawSearchTv: RawSearchTv,
  config: TmdbConfig
): SearchTv => {
  return {
    name: rawSearchTv.name || rawSearchTv.original_name,
    id: rawSearchTv.id,
    genres: rawSearchTv.genre_ids,
    year: getYear(rawSearchTv.first_air_date),
    url: buildImageUrl(config, rawSearchTv.poster_path),
    media_type: rawSearchTv.media_type,
    overview: rawSearchTv.overview,
  };
};

export const mapTmdbPerson = (
  personDetailWire: PersonDetailWire,
  config: TmdbConfig
): PersonDetail => {
  return {
    ...personDetailWire,
    profile_url: buildImageUrl(config, personDetailWire.profile_path),
  };
};

export const mapTmdbCast = (castWire: CastWire, config: TmdbConfig): Cast => {
  return {
    ...castWire,
    url: buildImageUrl(config, castWire.poster_path),
    rating: castWire.vote_average,
    year: getYear(castWire.release_date ?? castWire.first_air_date),
  };
};

export const mapTmdbCrew = (crewWire: CrewWire, config: TmdbConfig): Crew => {
  return {
    ...crewWire,
    url: buildImageUrl(config, crewWire.poster_path),
    rating: crewWire.vote_average,
    year: getYear(crewWire.release_date ?? crewWire.first_air_date),
  };
};

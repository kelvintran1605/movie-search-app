export type PersonDetailWire = {
  id: number;
  also_known_as: string[];
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type PersonDetail = Omit<PersonDetailWire, "profile_path"> & {
  profile_url: string;
};

export type CastWire = {
  release_date?: string;
  first_air_date?: string;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  title?: string;
  name?: string;
  character: string;
  credit_id: string;
  media_type: "movie" | "tv";
  vote_average: number;
};

export type CrewWire = Omit<CastWire, "character"> & {
  job: string;
  department: string;
};

export type Cast = Omit<CastWire, "poster_path" | "release_date"> & {
  url: string;
  rating: number;
  year: string;
};

export type Crew = Omit<CrewWire, "poster_path" | "release_date"> & {
  url: string;
  rating: number;
  year: string;
};

export type CreditResponse = {
  cast: CastWire[];
  crew: CrewWire[];
};

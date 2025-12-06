export type MovieSummary = {
  id: number;
  title: string;
  year?: string;
  imgUrl?: string;
  rating?: number;
  overview?: string;
  mediaType?: "movie" | "tv";
};

export type MovieDetail = MovieSummary & {
  genres?: { id: number; name: string }[];
  runtime?: number;
  spokenLanguages?: string[];
};

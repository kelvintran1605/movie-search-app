import {
  useGetCombinedCreditsQuery,
  useGetPersonDetailQuery,
} from "@/services/personApiSlice";
import Filmography from "../components/Filmography";
import MovieCarousel from "../components/MovieCarousel";
import { useParams } from "react-router-dom";
import PersonDetailSection from "../components/PersonDetailSection";
import type { Cast, Crew } from "@/types/person";

const CastDetail = () => {
  const { id } = useParams();

  const { data: detail, isLoading } = useGetPersonDetailQuery(Number(id));
  const { data: combinedCredits, isLoading: isCreditLoading } =
    useGetCombinedCreditsQuery(Number(id));

  const sortMoviesByPopularity = (cast: Cast[] = [], crew: Crew[] = []) => {
    const unique = [
      ...new Map([...cast, ...crew].map((item) => [item.id, item])).values(),
    ];
    return unique.sort((a, b) => b.popularity - a.popularity);
  };

  const knownForMovies = sortMoviesByPopularity(
    combinedCredits?.cast,
    combinedCredits?.crew
  )
    .map((m) => ({
      title: m.title,
      url: m.url,
      id: m.id,
      name: m.name,
      type: m.media_type,
    }))
    .slice(0, 9);

  if (!combinedCredits || isCreditLoading || isLoading || !detail) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center bg-slate-50 text-slate-900 dark:bg-[#0D0D0D] dark:text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 text-slate-900 dark:bg-[#0D0D0D] dark:text-white">
      <div className="py-12 px-25 w-full grid grid-cols-[1fr_3fr] gap-8">
        {/* Left Column */}
        <PersonDetailSection detail={detail} />

        {/* Right Column */}
        <div className="flex flex-col gap-4 min-w-0">
          <h2 className="font-bold text-4xl tracking-tight">{detail.name}</h2>

          <div className="mt-2">
            <div className="font-bold text-xl">Biography</div>
            <div className="mt-2 font-medium leading-relaxed text-slate-700 dark:text-gray-300">
              {detail.biography || "No biography available."}
            </div>
          </div>

          <div className="mt-2">
            <div className="font-bold text-xl">Known For</div>
            <div className="mt-3">
              <MovieCarousel knownForMovies={knownForMovies} />
            </div>
          </div>

          <div className="mt-2">
            <Filmography
              crew={combinedCredits.crew}
              cast={combinedCredits.cast}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastDetail;

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

  const personId = Number(id);

  const { data: detail, isLoading } = useGetPersonDetailQuery(personId);
  const { data: combinedCredits, isLoading: isCreditLoading } =
    useGetCombinedCreditsQuery(personId);

  const sortMoviesByPopularity = (cast: Cast[] = [], crew: Crew[] = []) => {
    const unique = [
      ...new Map([...cast, ...crew].map((item) => [item.id, item])).values(),
    ];
    return unique.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
  };

  const knownForMovies = sortMoviesByPopularity(
    combinedCredits?.cast,
    combinedCredits?.crew,
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
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr] xl:grid-cols-[360px_1fr]">
          {/* Left Column */}
          <div className="lg:sticky lg:top-24 self-start">
            <PersonDetailSection detail={detail} />
          </div>

          {/* Right Column */}
          <div className="min-w-0 flex flex-col gap-6">
            <h2 className="font-bold tracking-tight text-3xl sm:text-4xl">
              {detail.name}
            </h2>

            <section className="mt-1">
              <div className="font-bold text-lg sm:text-xl">Biography</div>
              <div className="mt-2 font-medium leading-relaxed text-slate-700 dark:text-gray-300 text-sm sm:text-base">
                {detail.biography || "No biography available."}
              </div>
            </section>

            <section>
              <div className="font-bold text-lg sm:text-xl">Known For</div>
              <div className="mt-3">
                <MovieCarousel knownForMovies={knownForMovies} />
              </div>
            </section>

            <section>
              <Filmography
                crew={combinedCredits.crew}
                cast={combinedCredits.cast}
              />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CastDetail;

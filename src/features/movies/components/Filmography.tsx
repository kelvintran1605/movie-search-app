import type { Cast, Crew } from "@/types/person";
import { Link } from "react-router-dom";

type FilmItem = Cast | Crew;

const DEPARTMENT_ORDER = [
  "Acting",
  "Directing",
  "Writing",
  "Production",
  "Sound",
  "Camera",
  "Editing",
  "Art",
  "Visual Effects",
  "Lighting",
  "Crew",
];

function FilmographySection({
  title,
  items,
  role,
}: {
  title: string;
  items: FilmItem[];
  role: (item: FilmItem) => string | undefined;
}) {
  if (!items.length) return null;

  const sorted = [...items].sort(
    (a, b) => (Number(b.year) || 0) - (Number(a.year) || 0),
  );

  return (
    <section aria-label={`${title} filmography`} className="min-w-0">
      <h2 className="mb-2 font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>

      <div
        role="list"
        aria-label={`${title} credits`}
        className="w-full rounded-2xl bg-white p-6 border border-slate-200 shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                      dark:bg-zinc-900 dark:border-zinc-700 dark:shadow-[0_20px_40px_rgba(0,0,0,0.65)]
                      flex flex-col gap-8"
      >
        {sorted.map((c) => (
          <div
            role="listitem"
            key={`${c.media_type}-${c.id}-${c.year}-${title}`}
            className="flex items-baseline gap-8 min-w-0"
          >
            <div
              className="shrink-0 font-semibold text-slate-500 dark:text-gray-400"
              aria-label={`Year ${c.year}`}
            >
              {c.year}
            </div>

            <div
              aria-hidden="true"
              className="-translate-y-1/3 shrink-0 w-3 h-3 border-2 rounded-full
                            border-slate-300 dark:border-white/70
                            flex items-center justify-center group"
            >
              <div
                aria-hidden="true"
                className="w-1 h-1 rounded opacity-0 group-hover:opacity-100 duration-150
                              bg-slate-700 dark:bg-white"
              />
            </div>

            <div className="min-w-0">
              <Link
                to={`/${c.media_type}/${c.id}`}
                aria-label={`Open ${c.name ?? c.title}${
                  role(c) ? `. Role: ${role(c)}` : ""
                }`}
                className="block font-bold truncate
                           text-slate-900 hover:text-sky-600 hover:underline hover:underline-offset-2 duration-150
                           dark:text-gray-100 dark:hover:text-[#60A5FA]"
              >
                {c.name ?? c.title}
              </Link>

              {role(c) && (
                <div
                  className="mt-1 text-sm font-medium text-slate-600 dark:text-gray-400"
                  aria-label={`Role ${role(c)}`}
                >
                  as {role(c)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const Filmography = ({ cast, crew }: { cast: Cast[]; crew: Crew[] }) => {
  const crewByDepartment = crew.reduce(
    (acc, c) => {
      const dept = c.department ?? "Other";
      acc[dept] ??= [];
      acc[dept].push(c);
      return acc;
    },
    {} as Record<string, Crew[]>,
  );

  return (
    <section aria-label="Filmography" className="flex flex-col gap-7">
      {cast.length > 0 && (
        <FilmographySection
          title="Acting"
          items={cast}
          role={(c) => (c as Cast).character}
        />
      )}

      {DEPARTMENT_ORDER.map((dept) =>
        crewByDepartment[dept]?.length ? (
          <FilmographySection
            key={dept}
            title={dept}
            items={crewByDepartment[dept]}
            role={(c) => (c as Crew).job}
          />
        ) : null,
      )}

      {Object.entries(crewByDepartment).map(([dept, items]) =>
        DEPARTMENT_ORDER.includes(dept) ? null : (
          <FilmographySection
            key={dept}
            title={dept}
            items={items}
            role={(c) => (c as Crew).job}
          />
        ),
      )}
    </section>
  );
};

export default Filmography;

import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetReviewDetailQuery } from "@/services/moviesApiSlice";

const DEFAULT_AVATAR =
  "https://api.dicebear.com/8.x/thumbs/svg?seed=movix-reviewer";

const formatDate = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso; // fallback if already formatted
  return d.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const clamp01to10 = (n?: number | null) => {
  if (n == null) return null;
  const v = Math.max(0, Math.min(10, n));
  return Math.round(v * 10) / 10;
};

export default function ReviewDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetReviewDetailQuery(id ?? "", {
    skip: !id,
  });

  const [expanded, setExpanded] = useState(false);

  const avatarUrl = useMemo(() => {
    const u = data?.profileUrl?.trim();
    return u ? u : DEFAULT_AVATAR;
  }, [data?.profileUrl]);

  const rating = useMemo(() => clamp01to10(data?.rating), [data?.rating]);
  if (!id) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70 shadow-sm dark:border-white/10 dark:bg-[#121212] dark:text-white/70">
          Missing review id.
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#121212]">
          <div className="flex gap-5">
            <div className="h-14 w-14 rounded-2xl bg-black/10 dark:bg-white/10" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-40 rounded bg-black/10 dark:bg-white/10" />
              <div className="h-3 w-56 rounded bg-black/10 dark:bg-white/10" />
              <div className="h-3 w-28 rounded bg-black/10 dark:bg-white/10" />
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-3 w-full rounded bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-[92%] rounded bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-[84%] rounded bg-black/10 dark:bg-white/10" />
            <div className="h-3 w-[70%] rounded bg-black/10 dark:bg-white/10" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl border border-black/10 bg-white p-6 text-sm text-black/70 shadow-sm dark:border-white/10 dark:bg-[#121212] dark:text-white/70">
          Couldn’t load this review. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#121212]/80">
        {/* Header */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <img
              src={avatarUrl}
              alt={`${data.name ?? "Reviewer"} avatar`}
              className="h-14 w-14 rounded-2xl object-cover ring-1 ring-black/10 dark:ring-white/10"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
              loading="lazy"
            />

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="truncate text-base font-semibold text-black dark:text-white">
                  {data.name == "" ? "Movix User" : data.name}
                </div>

                {rating != null && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-black/[0.03] px-2.5 py-1 text-xs font-semibold text-black dark:border-white/10 dark:bg-white/[0.06] dark:text-white">
                    <span className="text-[13px]">⭐</span>
                    {rating}/10
                  </span>
                )}
              </div>

              <div className="mt-1 text-sm text-black/60 dark:text-white/60">
                {formatDate(data.createdTime)}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          <div
            className={[
              "whitespace-pre-line break-words text-[15px] leading-7 text-black/85 dark:text-white/85",
              expanded ? "" : "line-clamp-10",
            ].join(" ")}
          >
            {data.content}
          </div>

          {data.content?.length > 500 && (
            <button
              type="button"
              onClick={() => setExpanded((p) => !p)}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white"
            >
              {expanded ? "Show less" : "Read more"}
              <span className="text-xs opacity-70">{expanded ? "▲" : "▼"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

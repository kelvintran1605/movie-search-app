import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

type MovieCardProps = {
  name: string;
  date: string;
  rating: number;
  imgURL: string;
};

const MovieCard = ({ name, date, rating, imgURL }: MovieCardProps) => {
  const percent = rating * 10;

  return (
    <div
      className="
        w-full overflow-hidden rounded-2xl shadow-xl
        cursor-pointer transition
        bg-white/80 dark:bg-white/10
        hover:ring-2 hover:ring-slate-600 dark:hover:ring-white
      "
    >
      {/* Poster */}
      <div className="relative">
        <div className="aspect-[2/3] w-full overflow-hidden">
          <img
            loading="lazy"
            src={imgURL}
            alt={name}
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* Rating Circle */}
        <div className="absolute bottom-3 left-3 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12">
          <div className="p-0.5 rounded-full bg-black/60 backdrop-blur-sm">
            <CircularProgressbar
              value={percent}
              text={rating === 0 ? "NR" : rating.toFixed(1)}
              strokeWidth={10}
              styles={buildStyles({
                textColor: "#fff",
                textSize: "30px",
                trailColor: "rgba(255,255,255,0.25)",
                pathColor:
                  rating >= 7 ? "#21d07a" : rating >= 5 ? "#d2d531" : "#db2360",
              })}
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4 bg-white dark:bg-[#1A1A1A]">
        <h3
          className="
            font-bold
            text-sm sm:text-[15px] md:text-base
            text-slate-900 dark:text-[#F2F2F2]
            hover:text-sky-500 dark:hover:text-[#60A5FA]
            duration-150
            line-clamp-2
          "
          title={name}
        >
          {name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 mt-1">
          {date}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;

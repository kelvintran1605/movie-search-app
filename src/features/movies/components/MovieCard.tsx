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
      className="w-[220px] h-[390px] rounded-2xl shadow-xl cursor-pointer overflow-hidden backdrop-blur-lg transition duration-250
      bg-white/80 dark:bg-white/10 hover:border-4 hover:border-slate-600 dark:hover:border-white"
    >
      <div className="relative overflow-hidden">
        <img
          className="transition duration-250 h-[300px] w-full object-cover z-0"
          src={imgURL}
          alt={name}
        />

        <div className="absolute bottom-3 left-3 w-12 h-12">
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

      <div
        className="p-4 h-full
        bg-white dark:bg-[#1A1A1A]
        shadow-xl dark:shadow-[#272727]"
      >
        <h3
          className="text-md font-bold
            text-slate-900 dark:text-[#F2F2F2]
            hover:text-sky-500 dark:hover:text-[#60A5FA]
            duration-150 whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {name}
        </h3>
        <p className="text-sm text-slate-600 dark:text-gray-200">{date}</p>
      </div>
    </div>
  );
};

export default MovieCard;

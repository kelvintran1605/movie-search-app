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
    <div className="w-[220px] h-[390px] rounded-2xl shadow-xl bg-white/10 hover:border-2 duration-150 hover:border-white backdrop-blur-lg cursor-pointer overflow-hidden">
      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          className="hover:scale-105 transition duration-250 h-[300px] w-full object-cover z-0"
          src={imgURL}
          alt={name}
        />

        {/* RATING BADGE */}
        <div className="absolute bottom-3 left-3 w-12 h-12">
          <div className="p-0.5 bg-black/60 backdrop-blur-sm rounded-full">
            <CircularProgressbar
              value={percent}
              text={rating === 0 ? "NR" : rating.toFixed(1)}
              strokeWidth={10}
              styles={buildStyles({
                textColor: "#fff",
                textSize: "30px",
                trailColor: "rgba(255,255,255,0.2)",
                pathColor:
                  rating >= 7 ? "#21d07a" : rating >= 5 ? "#d2d531" : "#db2360",
              })}
            />
          </div>
        </div>
      </div>

      <div className="p-4 w-full bg-[#1A1A1A] h-full shadow-[#272727] shadow-2xl">
        <h3
          className="text-md font-bold text-[#F2F2F2] hover:text-[#60A5FA] duration-150
            whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {name}
        </h3>
        <p className="text-sm text-gray-200">{date}</p>
      </div>
    </div>
  );
};

export default MovieCard;

import type { SearchOption } from "@/types/movie";
import { useNavigate } from "react-router-dom";

const ResultItem = ({
  onPanelOpen,
  title,
  meta,
  subheading,
  url,
  option,
  id,
  type,
}: {
  id: number;
  option: SearchOption; // "multi" | "movie" | "tv" | "person"
  type?: string;
  title: string;
  meta: string;
  subheading: string[];
  url: string;
  onPanelOpen: (state: boolean) => void;
}) => {
  const navigate = useNavigate();

  const resolvedType = option === "multi" ? type : option;

  const handleGo = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/${resolvedType}/${id}`);
  };

  return (
    <div
      onClick={() => onPanelOpen(false)}
      onMouseDown={handleGo}
      className="flex items-start gap-3 w-full border-b border-white/20 p-2 cursor-pointer hover:bg-gray-600/20 duration-150"
    >
      <img
        className="w-14 rounded-xl h-20 object-cover"
        src={url}
        alt={title}
      />

      <div className="flex flex-col">
        <div className="text-[1.1rem] font-medium">{title}</div>
        <div className="text-gray-300 w-full line-clamp-1">{meta}</div>

        <div className="flex items-center gap-2 flex-wrap">
          {Array.isArray(subheading)
            ? subheading.filter(Boolean).map((item) => (
                <span className="text-gray-400 text-sm" key={item}>
                  {item}
                </span>
              ))
            : subheading}
        </div>
      </div>
    </div>
  );
};

export default ResultItem;

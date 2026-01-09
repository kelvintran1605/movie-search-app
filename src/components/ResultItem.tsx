import type { Item } from "@radix-ui/react-navigation-menu";

const ResultItem = ({
  title,
  meta,
  subheading,
  url,
}: {
  title: string;
  meta: string;
  subheading: any;
  url: string;
}) => {
  return (
    <div className="flex items-start gap-3 w-full border-b border-white/20 p-2 cursor-pointer hover:bg-gray-600/20 duration-150">
      <img className="w-14 rounded-xl h-20 object-cover" src={url} />
      <div className="flex flex-col">
        <div className="text-[1.1rem] font-medium">{title}</div>
        <div className="text-gray-300 w-full line-clamp-1">{meta}</div>
        <div className="flex items-center gap-2">
          {Array.isArray(subheading)
            ? subheading.map((item) => (
                <div className="text-gray-300" key={item}>
                  {item}
                </div>
              ))
            : subheading}
        </div>
      </div>
    </div>
  );
};

export default ResultItem;

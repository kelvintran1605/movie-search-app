import { IoMdClose as CloseButton } from "react-icons/io";

const SideBar = ({ onToggleSideBar }: { onToggleSideBar: () => void }) => {
  const sideBarSections = [
    {
      group: "Movies",
      items: [
        { name: "Popular", url: "/popular" },
        { name: "Now Playing", url: "/now-playing" },
        { name: "Upcoming", url: "/upcoming" },
        { name: "Top Rated", url: "/top-rated" },
      ],
    },
    {
      group: "TV Shows",
      items: [
        { name: "Popular", url: "/popular" },
        { name: "On Air", url: "/on-air" },
        { name: "Top Rated", url: "/top-rated" },
      ],
    },
  ];
  return (
    <div
      className="
    p-10 text-white absolute top-0 left-1/2 -translate-x-1/2
    h-dvh w-full bg-[#202629] flex flex-col z-50
    md:w-[90%] md:h-[90vh] md:top-[5vh] lg:w-[40%] rounded-md
  "
    >
      <CloseButton
        onClick={onToggleSideBar}
        className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-400 cursor-pointer hover"
      />
      {/* Buttons */}
      <div className="w-full flex justify-center gap-4">
        <button
          className="px-5 py-1 bg-linear-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold rounded-xl text-base shadow-md 
          shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-[1.04] cursor-pointer"
        >
          Sign Up For Free
        </button>
        <button
          className="px-5 hover:bg-gray-300 py-1 bg-linear-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl text-base shadow-md 
          shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-[1.04] cursor-pointer"
        >
          Sign In
        </button>{" "}
      </div>

      {/* Sections */}
      {sideBarSections.map((section) => (
        <div className="flex flex-col gap-4">
          <div className="w-full border-b-1 border-gray-400/30 mt-8"></div>
          <h3 className="text-[#60A5FA] font-bold text-xl">{section.group}</h3>
          {section.items.map((item) => (
            <div className="text-[#FFFFFFCC] cursor-pointer hover:underline hover:text-gray-100">
              {item.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SideBar;

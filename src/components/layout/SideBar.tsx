import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef } from "react";
import { IoMdClose as CloseButton } from "react-icons/io";
import { Link } from "react-router-dom";

const SideBar = () => {
  const sideBarSections = [
    {
      group: "Movies",
      items: [
        { name: "Discover", url: "/movies/discover" },
        { name: "Now Playing", url: "/movies/now-playing" },
        { name: "Upcoming", url: "/movies/upcoming" },
        { name: "Top Rated", url: "/movies/top-rated" },
      ],
    },
    {
      group: "TV Shows",
      items: [
        { name: "Discover", url: "/tv/discover" },
        { name: "On Air", url: "/tv/now-playing" },
        { name: "Top Rated", url: "/tv/top-rated" },
      ],
    },
  ];

  // Get UI state
  const { openSignIn, openSignUp, closeSideBar } = useUI();

  // Get user state
  const { user, avatarUrl } = useAuth();

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    closeSideBar();
  };

  // Closing sidebar when user clicks esc
  useEffect(() => {
    closeBtnRef?.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSideBar();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeSideBar]);

  return (
    <nav
      aria-label="Sidebar menu"
      className="p-10 text-white fixed top-0 left-1/2 -translate-x-1/2 h-dvh w-full bg-[#202629] flex flex-col z-50
    md:w-[50%] md:h-[90vh] md:top-[5vh] rounded-md"
    >
      <button
        type="button"
        onClick={closeSideBar}
        aria-label="Close menu"
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-400
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
      >
        <CloseButton className="text-2xl" />
      </button>

      {/* Buttons */}
      {user ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4 text-[#60A5FA] font-bold">
            <img
              alt="User avatar"
              src={avatarUrl || "/default-profile-pic.jpg"}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-300 dark:ring-white/10"
            />
            <div>{user.user_metadata.name}</div>
          </div>

          <Link
            onClick={closeSideBar}
            to="/account-settings"
            className="text-[#FFFFFFCC] cursor-pointer hover:underline hover:text-gray-100"
          >
            Account Settings
          </Link>
          <Link
            onClick={closeSideBar}
            to="/watchlist"
            className="text-[#FFFFFFCC] cursor-pointer hover:underline hover:text-gray-100"
          >
            My Watchlist
          </Link>
          <div className="w-full text-center">
            <button
              onClick={handleSignOut}
              className="cursor-pointer bg-[#60A5FA] p-2 rounded-md hover:opacity-70 duration-150"
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center gap-4">
          <button
            onClick={openSignUp}
            className="px-5 py-1 bg-linear-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold rounded-xl text-base shadow-md 
          shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-[1.04] cursor-pointer"
          >
            Sign Up For Free
          </button>
          <button
            onClick={openSignIn}
            className="px-5 hover:bg-gray-300 py-1 bg-linear-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl text-base shadow-md 
          shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-[1.04] cursor-pointer"
          >
            Sign In
          </button>
        </div>
      )}

      {/* Sections */}
      {sideBarSections.map((section) => (
        <div className="flex flex-col gap-4">
          <div className="w-full border-b border-gray-400/30 mt-8"></div>
          <h3 className="text-[#60A5FA] font-bold text-xl">{section.group}</h3>
          {section.items.map((item) => (
            <Link
              onClick={closeSideBar}
              to={item.url}
              className="text-[#FFFFFFCC] cursor-pointer hover:underline hover:text-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default SideBar;

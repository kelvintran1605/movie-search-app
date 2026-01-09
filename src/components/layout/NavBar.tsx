// NavBar.tsx
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar.tsx";
import { useAuth } from "@/context/AuthContext.ts";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu.tsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdArrowDropdownCircle as DropDownArrow } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase.ts";

const NavBar = ({
  onToggleSideBar,
  onToggleSignUp,
  onToggleSignIn,
}: {
  onToggleSideBar: () => void;
  onToggleSignUp: () => void;
  onToggleSignIn: () => void;
}) => {
  const triggerClass = `
    bg-transparent
    hover:bg-gray-200
    dark:hover:bg-white
    data-[state=open]:bg-gray-200
    dark:data-[state=open]:bg-white

    text-black
    dark:text-white
    hover:text-black
    dark:hover:text-black
    data-[state=open]:text-black
    dark:data-[state=open]:text-black

    focus:bg-gray-200
    dark:focus:bg-white
    focus:text-black
    dark:focus:text-black

    font-semibold
    text-base
    cursor-pointer
    px-3
    py-1.5
    rounded-lg
    transition-colors
  `;

  const dropLink =
    "w-full block px-3 py-2 rounded-lg text-black/90 dark:text-white/90 hover:text-[#60A5FA] hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer font-bold transition";

  const { user, loading, avatarUrl } = useAuth();
  if (loading) {
    return null;
  }

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.log("Logout error: " + error.message);

    setIsProfileOpen(false);
  };
  const profileRef = useRef<HTMLDivElement>(null);
  // Click outside of the account chip -> close
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="relative w-full z-20 bg-white/95 text-black border-b border-gray-200 dark:bg-black/60 dark:text-white dark:border-white/10">
      <NavigationMenu viewport={false} className="w-full">
        <div className="flex w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <div
              className="text-3xl font-bold bg-linear-to-b cursor-pointer
              from-[#60A5FA] via-[#3B82F6] to-[#3B82F6]/80
              bg-clip-text text-transparent tracking-wider leading-none translate-y-[-3px] lg:text-5xl"
            >
              <Link to="/">Movix</Link>
            </div>

            <SearchBar />
          </div>

          <GiHamburgerMenu
            onClick={onToggleSideBar}
            className="ml-auto text-gray-600 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white duration-200 lg:hidden"
          />

          <NavigationMenuList className="hidden lg:flex items-center gap-8 text-base text-black dark:text-white">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerClass}>
                Movies
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-white text-black dark:bg-[#0D0D0D] dark:text-white rounded-xl shadow-xl border border-gray-200 dark:border-white/10 p-2 min-w-[200px]">
                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/movies/popular">Popular</Link>
                </NavigationMenuLink>

                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/movies/now-playing">Now Playing</Link>
                </NavigationMenuLink>

                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/movies/upcoming">Upcoming</Link>
                </NavigationMenuLink>

                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/movies/top-rated">Top Rated</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerClass}>
                TV Shows
              </NavigationMenuTrigger>

              <NavigationMenuContent className="bg-white text-black dark:bg-[#0D0D0D] dark:text-white rounded-xl shadow-xl border border-gray-200 dark:border-white/10 p-2 min-w-[200px]">
                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/tv/popular">Popular</Link>
                </NavigationMenuLink>

                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/tv/on-air">On Air</Link>
                </NavigationMenuLink>

                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/tv/top-rated">Top Rated</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {user ? (
              <div ref={profileRef}>
                {isProfileOpen && (
                  <div className="absolute right-0 top-full flex flex-col gap-2 bg-white text-black dark:bg-gray-800 dark:text-white border border-gray-200 dark:border-white/10 p-4 w-60 rounded-md font-semibold shadow-xl">
                    <span className="px-2 text-gray-600 dark:text-gray-400">
                      {user?.user_metadata.full_name || "Movix User"}
                    </span>

                    <Link
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 duration-150 px-2 flex items-center gap-3 cursor-pointer rounded-md"
                      to="/account-settings"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Account Settings
                    </Link>

                    <Link
                      onClick={() => setIsProfileOpen(false)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 duration-150 px-2 flex items-center gap-3 cursor-pointer rounded-md"
                      to="/watchlist"
                    >
                      My Watchlist
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 duration-150 px-2 flex items-center gap-3 cursor-pointer rounded-md text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
                <div
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-baseline cursor-pointer"
                >
                  <img
                    className="rounded-full w-9 hover:opacity-95 duration-150 object-cover h-9 ring-1 ring-gray-300 dark:ring-white/10"
                    src={avatarUrl || "/default-profile-pic.jpg"}
                  />
                  <DropDownArrow className="-translate-x-3 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={onToggleSignIn}
                  className="font-bold hover:underline cursor-pointer text-black dark:text-white"
                >
                  Sign In
                </button>

                <button
                  onClick={onToggleSignUp}
                  className="px-5 py-1 bg-linear-to-r from-[#3B82F6] to-[#60A5FA] text-white font-semibold rounded-xl text-base
              shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-[1.04] cursor-pointer"
                >
                  Sign Up For Free
                </button>
              </>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;

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
import { useUI } from "@/context/UIContext.ts";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

const NavBar = () => {
  const triggerClass = `
    bg-transparent
    hover:bg-gray-200
    dark:hover:bg-white/10
    data-[state=open]:bg-gray-200
    dark:data-[state=open]:bg-white/10
    text-black
    dark:text-white
    hover:text-black
    dark:hover:text-white
    data-[state=open]:text-black
    dark:data-[state=open]:text-white
    focus:bg-gray-200
    dark:focus:bg-white/10
    focus:text-black
    dark:focus:text-white
    font-semibold
    text-base
    cursor-pointer
    px-3
    py-1.5
    rounded-lg
    transition-colors
  `;

  const dropLink =
    "w-full block px-3 py-2 rounded-lg text-black/90 dark:text-white/90 hover:text-[#60A5FA] hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer font-bold transition";

  const { user, loading, avatarUrl } = useAuth();
  const { openSignIn, openSignUp, openSideBar } = useUI();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!profileRef.current?.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (loading) return null;

  return (
    <nav className="relative w-full z-20 bg-white/95 text-black border-b border-gray-200 dark:bg-black/60 dark:text-white dark:border-white/10">
      <NavigationMenu viewport={false} className="w-full">
        <div className="flex w-full items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4 w-full">
            <Link
              to="/"
              className={`${isSearchBarOpen ? "hidden" : "flex"} md:flex text-3xl lg:text-5xl font-bold bg-linear-to-b from-[#60A5FA] via-[#3B82F6] to-[#3B82F6]/80 bg-clip-text text-transparent tracking-wider leading-none`}
            >
              Movix
            </Link>

            <SearchBar isOpen={isSearchBarOpen} />

            {isSearchBarOpen && (
              <button
                type="button"
                onClick={() => setIsSearchBarOpen(false)}
                aria-label="Close search"
                className="md:hidden cursor-pointer hover:text-gray-400 duration-150 absolute right-4 top-1/2 -translate-y-1/2
               focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
              >
                <MdClose className="text-xl" />
              </button>
            )}
          </div>

          <div
            className={`${isSearchBarOpen ? "hidden" : "block"} ml-auto flex gap-4 items-center`}
          >
            <button
              type="button"
              onClick={() => setIsSearchBarOpen((prev) => !prev)}
              aria-label="Open search"
              className={`${isSearchBarOpen ? "hidden" : "block"} md:hidden
             text-slate-600 hover:text-slate-900 text-xl dark:text-gray-300 dark:hover:text-white
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded`}
            >
              <CiSearch />
            </button>
            <button
              type="button"
              onClick={openSideBar}
              aria-label="Open menu"
              className="ml-auto lg:hidden text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white
             duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded"
            >
              <GiHamburgerMenu />
            </button>
          </div>

          <NavigationMenuList className="hidden lg:flex items-center gap-8">
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerClass}>
                Movies
              </NavigationMenuTrigger>
              <NavigationMenuContent className="bg-white text-black dark:bg-[#0D0D0D] dark:text-white rounded-xl shadow-xl border border-gray-200 dark:border-white/10 p-2 min-w-[200px]">
                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/movies/discover">Discover</Link>
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
                  <Link to="/tv/discover">Discover</Link>
                </NavigationMenuLink>
                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/tv/now-playing">On Air</Link>
                </NavigationMenuLink>
                <NavigationMenuLink className={dropLink} asChild>
                  <Link to="/tv/top-rated">Top Rated</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="relative">
              {user ? (
                <div ref={profileRef} className="relative">
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 flex flex-col gap-2 bg-white text-black dark:bg-[#0D0D0D] dark:text-white border border-gray-200 dark:border-white/10 p-4 w-60 rounded-xl shadow-xl font-semibold">
                      <span className="px-2 text-gray-600 dark:text-gray-400">
                        {user.user_metadata.full_name || "Movix User"}
                      </span>
                      <Link
                        to="/account-settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="px-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        Account Settings
                      </Link>
                      <Link
                        to="/watchlist"
                        onClick={() => setIsProfileOpen(false)}
                        className="px-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        My Watchlist
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="px-2 text-left rounded-md hover:bg-gray-100 dark:hover:bg-white/10"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img
                      src={avatarUrl || "/default-profile-pic.jpg"}
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-300 dark:ring-white/10"
                    />
                    <DropDownArrow className="text-gray-700 dark:text-gray-300" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button
                    onClick={openSignIn}
                    className="font-bold w-15 hover:underline"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={openSignUp}
                    className="px-5 py-1 w-38 rounded-xl font-semibold text-white bg-linear-to-r from-[#3B82F6] to-[#60A5FA] shadow-md shadow-blue-500/20 hover:scale-[1.04] transition"
                  >
                    Sign Up For Free
                  </button>
                </div>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;

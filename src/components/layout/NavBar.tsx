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
import { useState } from "react";
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
    hover:bg-white
    data-[state=open]:bg-white

    text-white
    hover:text-black
    data-[state=open]:text-black

    focus:bg-white
    focus:text-black

    font-semibold
    text-base
    cursor-pointer
    px-3
    py-1.5
    rounded-lg
    transition-colors
  `;

  const dropLink =
    "w-full block px-3 py-2 rounded-lg text-black/90 hover:text-[#60A5FA] hover:bg-gray-100 cursor-pointer font-bold transition";

  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  // Drop down state for user profile
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) console.log("Logout error: " + error.message);

    setIsProfileOpen(false);
  };
  return (
    <nav className="relative w-full z-20 bg-black/90">
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
            className="ml-auto text-gray-400 cursor-pointer hover:text-white duration-200 lg:hidden"
          />

          <NavigationMenuList className="hidden lg:flex items-center gap-8 text-base text-white">
            {/* Movies */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerClass}>
                Movies
              </NavigationMenuTrigger>

              <NavigationMenuContent
                className="
                  bg-[#0D0D0D]
                  text-white
                  rounded-xl
                  shadow-xl
                  border border-white/10
                  p-2
                  min-w-[200px]
                "
              >
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

            {/* TV Shows */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className={triggerClass}>
                TV Shows
              </NavigationMenuTrigger>

              <NavigationMenuContent
                className="
                  bg-[#0D0D0D]
                  text-white
                  rounded-xl
                  shadow-xl
                  border border-white/10
                  p-2
                  min-w-[200px]
                "
              >
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
            {isProfileOpen && (
              <div className="absolute right-0 top-full flex flex-col gap-2 bg-gray-800 p-4 w-60 rounded-md font-semibold">
                <span className="px-2 text-gray-400">
                  {user?.user_metadata.full_name}
                </span>

                <Link
                  className="hover:bg-gray-600 duration-150 px-2 flex items-center gap-3 cursor-pointer"
                  to="/account-settings"
                >
                  Account Settings
                </Link>

                <Link
                  className="hover:bg-gray-600 duration-150 px-2 flex items-center gap-3 cursor-pointer"
                  to="/watchlist"
                >
                  My Watchlist
                </Link>

                <button
                  onClick={handleSignOut}
                  className="hover:bg-gray-600 duration-150 px-2 flex items-center gap-3 cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
            {user ? (
              <div
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-baseline cursor-pointer"
              >
                <img
                  className="rounded-full w-9 hover:opacity-95 duration-150"
                  src={user.user_metadata?.avatar_url}
                />
                <DropDownArrow className="-translate-x-3" />
              </div>
            ) : (
              <>
                <button
                  onClick={onToggleSignIn}
                  className="font-bold hover:underline cursor-pointer"
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

// NavBar.tsx
import SearchBar from "../SearchBar.tsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu.tsx";
import { GiHamburgerMenu } from "react-icons/gi";

const NavBar = ({
  onToggleSideBar,
  onToggleSignUp,
  onToggleSignIn,
}: {
  onToggleSideBar: () => void;
  onToggleSignUp: () => void;
  onToggleSignIn: () => void;
}) => {
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
              Movix
            </div>
    
            <SearchBar />
          </div>

          {/* Hamburger Icon */}
          <GiHamburgerMenu
            onClick={onToggleSideBar}
            className="ml-auto text-gray-400 cursor-pointer hover:text-white duration-250 lg:hidden"
          />

          <NavigationMenuList className="hidden lg:flex items-center gap-8 text-base text-white">
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold text-base text-black cursor-pointer">
                Movies
              </NavigationMenuTrigger>
              <NavigationMenuContent className="cursor-pointer">
                <NavigationMenuLink>Popular</NavigationMenuLink>
                <NavigationMenuLink>Now Playing</NavigationMenuLink>
                <NavigationMenuLink>Upcoming</NavigationMenuLink>
                <NavigationMenuLink>Top Rated</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="font-semibold text-base text-black cursor-pointer ">
                TV Shows
              </NavigationMenuTrigger>
              <NavigationMenuContent className="cursor-pointer">
                <NavigationMenuLink>Popular</NavigationMenuLink>
                <NavigationMenuLink>On Air</NavigationMenuLink>
                <NavigationMenuLink>Top Rated</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <button
              onClick={onToggleSignIn}
              className="font-bold hover:underline cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onToggleSignUp}
              className="px-5 py-1 bg-linear-to-r from-[#3B82F6] to-[#60A5FA]   text-white font-semibold rounded-xl text-base 
              shadow-md shadow-blue-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/30 hover:scale-[1.04] cursor-pointer"
            >
              Sign Up For Free
            </button>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
    </nav>
  );
};

export default NavBar;

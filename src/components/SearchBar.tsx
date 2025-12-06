import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <form className="w-full min-w-[20rem] lg:min-w-80 lg:max-w-xs">
      <Input className="w-full" type="text" placeholder="Search Movies & TV" />
    </form>
  );
};

export default SearchBar;

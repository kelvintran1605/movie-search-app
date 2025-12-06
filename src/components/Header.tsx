import Hero from "./Hero";
import NavBar from "./ui/NavBar";

const Header = () => {
  return (
    <header className="relative h-[700px]">
      {/* Background */}
      <Hero />

      {/* NavBar */}
      <NavBar />
    </header>
  );
};

export default Header;

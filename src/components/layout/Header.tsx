import NavBar from "./NavBar";

const Header = ({ onToggleSideBar }: { onToggleSideBar: () => void }) => {
  return (
    <header className="relative">
      {/* NavBar */}
      <NavBar onToggleSideBar={onToggleSideBar} />
    </header>
  );
};

export default Header;

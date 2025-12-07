import Hero from "./Hero";
import NavBar from "./NavBar";
import { useState } from "react";
import SideBar from "./SideBar";
const Header = () => {
  // Sidebar state
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  // Toggle Sidebar
  const handleToggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  return (
    <header className="relative h-[700px]">
      {/* Background */}
      <Hero />

      {/* NavBar */}
      <NavBar onToggleSideBar={handleToggleSideBar} />

      {isSideBarOpen && <SideBar onToggleSideBar={handleToggleSideBar} />}
    </header>
  );
};

export default Header;

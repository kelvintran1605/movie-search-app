import NavBar from "./NavBar";

const Header = ({
  onToggleSideBar,
  onToggleSignUp,
  onToggleSignIn,
}: {
  onToggleSideBar: () => void;
  onToggleSignUp: () => void;
  onToggleSignIn: () => void;
}) => {
  return (
    <header className="relative">
      {/* NavBar */}
      <NavBar
        onToggleSignIn={onToggleSignIn}
        onToggleSignUp={onToggleSignUp}
        onToggleSideBar={onToggleSideBar}
      />
    </header>
  );
};

export default Header;

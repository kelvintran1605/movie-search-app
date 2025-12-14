import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "@/components/layout/SideBar";
import SignUpPopUp from "@/features/auth/components/SignUpPopUp";
import SignInPopUp from "@/features/auth/components/SignInPopUp";
const MainLayout = () => {
  // Sidebar state
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isSignInOpen, setSignInOpen] = useState(false);

  // Toggle Sidebar
  const handleToggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };
  // Toggle Sign up popup
  const handleToggleSignUp = () => {
    setSignUpOpen(!isSignUpOpen);
  };
  // Toggle Sign In popup
  const handleToggleSignIn = () => {
    setSignInOpen(!isSignInOpen);
  };
  return (
    <>
      <Header
        onToggleSignIn={handleToggleSignIn}
        onToggleSignUp={handleToggleSignUp}
        onToggleSideBar={handleToggleSideBar}
      />
      {/* Conditional Rendering Sidebar */}
      {isSideBarOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={handleToggleSideBar}
            className="fixed z-50 inset-0 bg-black/50"
          ></div>
          <SideBar
            onToggleSignUp={handleToggleSignUp}
            onToggleSideBar={handleToggleSideBar}
            onToggleSignIn={handleToggleSignIn}
          />
        </>
      )}

      {/* Sign Up Popup */}
      {isSignUpOpen && (
        <SignUpPopUp
          onToggleSignIn={handleToggleSignIn}
          onToggleSignUp={handleToggleSignUp}
        />
      )}
      {isSignInOpen && (
        <SignInPopUp
          onToggleSignUp={handleToggleSignUp}
          onToggleSignIn={handleToggleSignIn}
        />
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;

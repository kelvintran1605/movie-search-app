import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/layout/SideBar";
import SignUpPopUp from "@/features/auth/components/SignUpPopUp";
import SignInPopUp from "@/features/auth/components/SignInPopUp";
import { Toaster } from "react-hot-toast";
import { useUI } from "@/context/UIContext";

const MainLayout = () => {
  const { isSignInOpen, isSignUpOpen, closeSideBar, isSideBarOpen } = useUI();
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 dark:bg-[#0D0D0D] dark:text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1a1a1a",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#000",
            },
          },
        }}
      />

      <Header />

      {isSideBarOpen && (
        <>
          <div
            onClick={closeSideBar}
            className="fixed z-50 inset-0 bg-black/50 dark:bg-black/60"
          />
          <SideBar />
        </>
      )}

      {isSignUpOpen && <SignUpPopUp />}

      {isSignInOpen && <SignInPopUp />}

      <main className="flex-1 bg-slate-50 dark:bg-[#0D0D0D]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

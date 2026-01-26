import type { ReactNode } from "react";
import { UIContext } from "./UIContext";
import { useMemo, useState } from "react";
const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const value = useMemo(
    () => ({
      isSignInOpen,
      isSignUpOpen,
      isSideBarOpen,
      openSideBar: () => {
        setIsSideBarOpen(true);
      },
      closeSideBar: () => {
        setIsSideBarOpen(false);
      },
      openSignIn: () => {
        setIsSignUpOpen(false);
        setIsSignInOpen(true);
      },
      closeSignIn: () => setIsSignInOpen(false),
      openSignUp: () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(true);
      },
      closeSignUp: () => setIsSignUpOpen(false),
      closeAll: () => {
        setIsSignInOpen(false);
        setIsSignUpOpen(false);
        setIsSideBarOpen(false);
      },
    }),
    [isSignInOpen, isSignUpOpen, isSideBarOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export default UIProvider;

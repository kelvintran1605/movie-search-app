import { createContext, useContext } from "react";

type UIContextType = {
  isSideBarOpen: boolean;
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
  openSignIn: () => void;
  closeSignIn: () => void;
  openSignUp: () => void;
  closeSignUp: () => void;
  closeAll: () => void;
};

export const UIContext = createContext<UIContextType>({
  isSideBarOpen: false,
  openSideBar: () => {},
  closeSideBar: () => {},
  isSignInOpen: false,
  isSignUpOpen: false,
  openSignIn: () => {},
  closeSignIn: () => {},
  openSignUp: () => {},
  closeSignUp: () => {},
  closeAll: () => {},
});

export const useUI = () => useContext(UIContext);

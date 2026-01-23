import { createContext, useContext } from "react";

type UIContextType = {
  isSignInOpen: boolean;
  isSignUpOpen: boolean;
  openSignIn: () => void;
  closeSignIn: () => void;
  openSignUp: () => void;
  closeSignUp: () => void;
  closeAll: () => void;
};

export const UIContext = createContext<UIContextType>({
  isSignInOpen: false,
  isSignUpOpen: false,
  openSignIn: () => {},
  closeSignIn: () => {},
  openSignUp: () => {},
  closeSignUp: () => {},
  closeAll: () => {},
});

export const useUI = () => useContext(UIContext);

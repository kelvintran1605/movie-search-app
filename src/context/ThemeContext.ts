import { createContext, useContext } from "react";

export type ThemeMode = "light" | "dark" | "system";

export type Theme = {
  themeMode: ThemeMode;
  setThemeMode: (state: ThemeMode) => void;
};
export const ThemeContext = createContext<Theme>({
  themeMode: "dark",
  setThemeMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

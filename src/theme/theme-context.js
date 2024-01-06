import { createTheme } from "@mui/material";
import { createContext } from "react";

export const ThemeContext = createContext({
  themeMode: "", // light, dark
  setThemeMode: () => {},
  theme: createTheme(),
});

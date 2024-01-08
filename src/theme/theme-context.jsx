import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { getThemeTokens } from "./theme-tokens";

export const ThemeContext = createContext({});

export const AppThemeProvider = ({ children }) => {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(
    isSystemDarkMode ? "dark" : "light"
  );

  const appTheme = useMemo(
    () => createTheme(getThemeTokens(themeMode)),
    [themeMode]
  );

  const contextValue = {
    themeMode,
    setThemeMode,
    appTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={appTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

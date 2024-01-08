import { useContext } from "react";
import { ThemeContext } from "./theme-context";

export const useAppTheme = () => {
  const { appTheme, themeMode, setThemeMode } = useContext(ThemeContext);

  //NOTE: 필요하면 기능 추가

  return {
    appTheme,
    themeMode,
    setThemeMode,
  };
};

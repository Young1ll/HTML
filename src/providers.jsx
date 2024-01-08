import { AppThemeProvider } from "./theme";

const AppProviders = ({ children }) => {
  return <AppThemeProvider>{children}</AppThemeProvider>;
};

export default AppProviders;

import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// state
import useStore from "./store";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// utils
import AppLoader from "./components/layouts/AppLoader";
import SnackbarManager from "./components/utils/SnackbarManager";

// screens
import BoardsScreen from "./screens/BoardsScreen";
import BoardScreen from "./screens/BoardScreen";

import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import PrivateRoute from "./components/utils/PrivateRoute";

import UserScreen from "./screens/UserScreen";
import AuthScreen from "./screens/AuthScreen";
import ExploreScreen from "./screens/ExploreScreen";

// theme
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { ThemeContext, getThemeTokens } from "./theme";

const App = () => {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [themeMode, setThemeMode] = useState(
    isSystemDarkMode ? "dark" : "light"
  );

  const appTheme = useMemo(
    () => createTheme(getThemeTokens(themeMode)),
    [themeMode]
  );

  const { loader, setLoginState } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginState(!!user); // type conversion
    });

    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <SnackbarManager />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<PublicOnlyRoute Component={AuthScreen} />}
            />
            <Route
              path="/user/:userId"
              element={<PrivateRoute Component={UserScreen} />}
            />
            <Route
              path="/boards"
              element={<PrivateRoute Component={BoardsScreen} />}
            />
            <Route
              path="/boards/:boardId"
              element={<PrivateRoute Component={BoardScreen} />}
            />
            <Route
              path="/explore"
              element={<PrivateRoute Component={ExploreScreen} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default App;

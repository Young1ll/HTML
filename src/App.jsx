import { useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import useStore from "./store";
import AppLoader from "./components/layouts/AppLoader";

// screens
import BoardsScreen from "./screens/BoardsScreen";
import BoardScreen from "./screens/BoardScreen";

import PublicOnlyRoute from "./components/utils/PublicOnlyRoute";
import PrivateRoute from "./components/utils/PrivateRoute";

import SnackbarManager from "./components/utils/SnackbarManager";
import DiscoverScreen from "./screens/DiscoverScreen";
import UserScreen from "./screens/UserScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const App = () => {
  const { loader, setLoginState } = useStore();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginState(!!user); // type conversion
    });

    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarManager />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<PublicOnlyRoute Component={LoginScreen} />}
          />
          <Route
            path="/register"
            element={<PublicOnlyRoute Component={RegisterScreen} />}
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
            path="/discover"
            element={<PrivateRoute Component={DiscoverScreen} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

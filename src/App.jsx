import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// state
import useStore from "./store";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

// utils
import AppLoader from "./components/layouts/AppLoader";
import SnackbarManager from "./components/utils/SnackbarManager";

// theme
import { CssBaseline, useMediaQuery } from "@mui/material";
import AppRoutes from "./routes";
import { doc, getDoc } from "firebase/firestore";
import { useAppTheme } from "./theme";

const App = () => {
  const isSystemDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const { loader, setLoginState } = useStore();
  const { setThemeMode } = useAppTheme();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setLoginState(!!user); // type conversion

      if (user) {
        const docRef = doc(db, `users/${user.uid}`);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setThemeMode(docSnap.data().theme);
          }
        });
      } else {
        setThemeMode(isSystemDarkMode ? "dark" : "light");
      }
    });
    return () => unsub();
  }, []);

  if (loader) return <AppLoader />;

  return (
    <>
      <CssBaseline />
      <SnackbarManager />

      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
};

export default App;

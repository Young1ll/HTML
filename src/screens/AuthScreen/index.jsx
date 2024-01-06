import { useContext, useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Box,
  Link,
  Button,
  useTheme,
  IconButton,
} from "@mui/material";
import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";
import AppLoader from "../../components/layouts/AppLoader";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { ThemeContext } from "../../theme";
import { DarkMode, LightMode } from "@mui/icons-material";
// import { useThemeContext } from "../../theme/theme-context";

const initLoginForm = {
  email: "",
  password: "",
};
const initRegisterForm = {
  username: "",
  email: "",
  password: "",
};

const LoginScreen = () => {
  const theme = useTheme();
  const { themeMode, setThemeMode } = useContext(ThemeContext);
  // const { mode, toggleThemeMode } = useThemeContext();
  const { setToastr } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initLoginForm);
  const [registerForm, setRegisterForm] = useState(initRegisterForm);

  const handleChange = (e) => {
    if (isLogin) {
      setLoginForm((oldForm) => ({
        ...oldForm,
        [e.target.name]: e.target.value,
      }));
    } else {
      setRegisterForm((oldForm) => ({
        ...oldForm,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(
          auth,
          loginForm.email,
          loginForm.password
        );
      } else {
        await createUserWithEmailAndPassword(
          auth,
          registerForm.email,
          registerForm.password
        ).then(() => {
          if (registerForm.username)
            return updateProfile(auth.currentUser, {
              displayName: registerForm.username,
            });
        });

        setToastr("Welcome to minimumKanban!", "success");
      }
    } catch (err) {
      const msg = err.code.split("auth/")[1].split("-").join(" ");
      setToastr(msg, "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageLoading) {
      setPageLoading(false);
    }
  }, []);

  const authText = isLogin ? (
    <Stack mt={2} justifyContent={"center"} alignItems={"center"}>
      <Typography>
        Ready to explore more?{" "}
        <Link onClick={() => setIsLogin(false)}>Join us</Link> as a member!
      </Typography>
      <Link>Forgot Password?</Link>
    </Stack>
  ) : (
    <Box mt={2} display={"flex"} justifyContent={"center"}>
      <Typography>
        Already have an account?{" "}
        <Link onClick={() => setIsLogin(true)}>Log In</Link>
      </Typography>
    </Box>
  );

  if (pageLoading) return <AppLoader />;
  return (
    <Container
      sx={{
        mt: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      maxWidth="xs"
    >
      <Box position={"absolute"} top={15} right={25}>
        <IconButton
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
        >
          {themeMode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>

      <Stack spacing={6} alignItems="center" textAlign="center">
        <Stack direction={"row"} spacing={1}>
          <ImageEl
            sx={{ height: 40 }}
            alignItems={"center"}
            src={LogoImg}
            alt="minimum Kanban"
          />

          <Typography fontSize={"2rem"} lineHeight={1}>
            minimumKanban
          </Typography>
        </Stack>

        <Typography>
          Visualize your Workflow for Increased Productivity. Access Your Tasks
          Anytime, Anywhere.
        </Typography>

        {isLogin ? (
          <LoginForm
            loading={loading}
            loginForm={loginForm}
            handleLoginChange={handleChange}
            handleAuth={handleAuth}
          />
        ) : (
          <RegisterForm
            loading={loading}
            registerForm={registerForm}
            handleRegisterChange={handleChange}
            handleAuth={handleAuth}
          />
        )}
      </Stack>

      {authText}

      <Stack
        flexGrow={1}
        justifyContent={"flex-end"}
        alignItems={"center"}
        py={10}
      >
        <Typography>Welcome to minimumKanban</Typography>
        <Typography>
          minimumKanban™ created by{" "}
          <Link href="https://github.com/young1ll" target="_blank">
            young1ll
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
};

export default LoginScreen;

import { useEffect, useState } from "react";
import {
  Container,
  Stack,
  Typography,
  Box,
  Link,
  IconButton,
  Button,
} from "@mui/material";
import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";
import AppLoader from "../../components/layouts/AppLoader";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useFireUser from "../../hooks/use-fire-user";
import ResetPasswordModal from "./ResetPasswordModal";
import { useAppTheme } from "../../theme";
import TesterAccountModal from "./TesterAccountModal";

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

const AuthPage = () => {
  const { themeMode, setThemeMode } = useAppTheme();
  const { signUpAndSaveUserData } = useFireUser();
  const navigate = useNavigate();
  const { setToastr } = useStore();
  const [isLogin, setIsLogin] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initLoginForm);
  const [registerForm, setRegisterForm] = useState(initRegisterForm);
  const [showResetPwModal, setShowResetPwModal] = useState(false);
  const [showTesterModal, setShowTesterModal] = useState(false);

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
        ).then((userCredentials) => {
          if (!userCredentials.user.emailVerified) {
            signOut(auth);
            navigate("/");

            setToastr("Please verify your email", "error");
          }
          navigate("/board", { replace: true });
        });
      } else {
        await signUpAndSaveUserData({
          auth,
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password,
          userData: { theme: themeMode, language: "en", role: "newbee" },
        });

        setRegisterForm({
          username: "",
          email: "",
          password: "",
        });
        setIsLogin(true);

        // setToastr("Welcome to minimumKanban!", "success");
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
      <Link onClick={() => setShowResetPwModal(true)}>Forgot Password?</Link>
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      maxWidth="xs"
    >
      {showResetPwModal && (
        <ResetPasswordModal closeModal={() => setShowResetPwModal(false)} />
      )}
      {showTesterModal && (
        <TesterAccountModal closeModal={() => setShowTesterModal(false)} />
      )}

      <Box position={"absolute"} top={15} right={25}>
        <IconButton
          onClick={() => setThemeMode(themeMode === "dark" ? "light" : "dark")}
        >
          {themeMode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Box>

      <Stack mt={10} spacing={6} alignItems="center" textAlign="center">
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

        <Button
          variant="outlined"
          style={{ marginTop: 16 }}
          onClick={() => setShowTesterModal(true)}
        >
          TESTER!
        </Button>

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

export default AuthPage;

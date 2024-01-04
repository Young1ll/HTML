import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Stack,
  Typography,
  Button,
  Box,
  Link,
} from "@mui/material";
import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";
import AppLoader from "../../components/layouts/AppLoader";

const initLoginForm = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const { setToastr } = useStore();
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(initLoginForm);

  const handleLoginChange = (e) => {
    setLoginForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );
    } catch (err) {
      const msg = err.code.split("auth/")[1].split("-").join(" ");
      setToastr(msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pageLoading) {
      setPageLoading(false);
    }
  }, []);

  if (pageLoading) return <AppLoader />;
  return (
    <Container sx={{ mt: 10 }} maxWidth="xs">
      <Stack spacing={6} alignItems="center" textAlign="center">
        <Stack direction={"row"} spacing={1}>
          <ImageEl
            sx={{ height: 40 }}
            alignItems={"center"}
            src={LogoImg}
            alt="minimum Kanban"
          />

          <Typography
            fontSize={"2rem"}
            lineHeight={1}
            color={"rgba(255, 255, 255, 0.6)"}
          >
            minimumKanban
          </Typography>
        </Stack>

        <Typography color={"rgba(255, 255, 255, 0.6)"}>
          Visualize your Workflow for Increased Productivity. Access Your Tasks
          Anytime, Anywhere.
        </Typography>

        <Stack spacing={2} width={"100%"}>
          <Stack spacing={1}>
            <TextField
              value={loginForm.email}
              name="email"
              label="Email"
              onChange={handleLoginChange}
            />
            <TextField
              value={loginForm.password}
              name="password"
              label="Password"
              onChange={handleLoginChange}
            />
          </Stack>

          <Button
            size="large"
            variant="contained"
            disabled={
              loading || !loginForm.email.trim() || !loginForm.password.trim()
            }
            onClick={handleAuth}
          >
            Login
          </Button>
        </Stack>
      </Stack>

      <Box mt={2} display={"flex"} justifyContent={"center"}>
        <Typography
          sx={{ cursor: "pointer" }}
          display={"inline"}
          align="center"
        >
          Ready to explore more? <Link href="/register">Join us</Link> as a
          member!
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginScreen;

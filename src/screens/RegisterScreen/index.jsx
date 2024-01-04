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

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import useStore from "../../store";
import AppLoader from "../../components/layouts/AppLoader";

const initRegisterForm = {
  username: "",
  email: "",
  password: "",
};

const RegisterScreen = () => {
  const { setToastr } = useStore();
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registerForm, setRegisterForm] = useState(initRegisterForm);

  const handleRegisterChange = (e) => {
    setRegisterForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async () => {
    try {
      setLoading(true);

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

      setToastr("Welcome to minimumKanban!");
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
    <Container sx={{ mt: 5 }} maxWidth="xs">
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
              value={registerForm.username}
              name="username"
              label="Username(Optional)"
              onChange={handleRegisterChange}
            />
            <TextField
              value={registerForm.email}
              name="email"
              label="Email"
              onChange={handleRegisterChange}
            />
            <TextField
              value={registerForm.password}
              name="password"
              label="Password"
              onChange={handleRegisterChange}
            />
          </Stack>

          <Button
            size="large"
            variant="contained"
            disabled={
              loading ||
              !registerForm.email.trim() ||
              !registerForm.password.trim()
            }
            onClick={handleAuth}
          >
            Register
          </Button>
        </Stack>
      </Stack>

      <Box mt={2} display={"flex"} justifyContent={"center"}>
        <Typography
          sx={{ cursor: "pointer" }}
          display={"inline"}
          align="center"
        >
          Already have an account? <Link href="/">Log In</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterScreen;

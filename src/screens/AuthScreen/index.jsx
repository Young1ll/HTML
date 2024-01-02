import { useState } from "react";
import { Container, TextField, Stack, Typography, Button } from "@mui/material";
import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const initForm = {
  email: "",
  password: "",
};

const AuthScreen = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [form, setForm] = useState(initForm);

  const authText = isLogin
    ? "Do not have an account?"
    : "Already have an account?";

  const handleChange = (e) => {
    setForm((oldForm) => ({
      ...oldForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAuth = async () => {
    try {
      setLoading(true);
      if (isLogin) {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      } else {
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    } catch (err) {
      const msg = err.code.split("auth/")[1].split("-").join(" ");
      console.log(msg);
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 10 }} maxWidth="xs">
      <Stack spacing={6} alignItems="center" textAlign="center">
        <Stack direction={"row"}>
          <ImageEl
            sx={{ mt: 10, height: 40 }}
            src={LogoImg}
            alt="minimum Kanban"
          />

          <Typography color={"rgba(255, 255, 255, 0.6)"}>
            minimum Kanban
          </Typography>
        </Stack>

        <Typography color={"rgba(255, 255, 255, 0.6)"}>
          Visualize your Workflow for Increased Productivity. Access Your Tasks
          Anytime, Anywhere.
        </Typography>

        <Stack spacing={2} width={"100%"}>
          <TextField
            value={form.email}
            name="email"
            label="Email"
            onChange={handleChange}
          />
          <TextField
            value={form.password}
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button
            size="large"
            variant="contained"
            disabled={loading || !form.email.trim() || !form.password.trim()}
            onClick={handleAuth}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
        </Stack>
      </Stack>

      <Typography
        sx={{ mt: 2, cursor: "pointer", textAlign: "center" }}
        onClick={() => setIsLogin((o) => !o)}
      >
        {authText}
      </Typography>
    </Container>
  );
};

export default AuthScreen;

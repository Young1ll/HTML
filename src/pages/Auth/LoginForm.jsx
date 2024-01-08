import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useKeypress from "../../hooks/use-keypress";

const LoginForm = ({ loading, loginForm, handleLoginChange, handleAuth }) => {
  const [visibility, setVisibility] = useState(false);

  const submitOk =
    loading || !loginForm.email.trim() || !loginForm.password.trim();

  const handleEnter = () => {
    if (!submitOk) handleAuth();
  };

  useKeypress("Enter", handleEnter);

  return (
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
          type={visibility ? "text" : "password"}
          name="password"
          label="Password"
          InputProps={{
            endAdornment: (
              <IconButton onClick={() => setVisibility(!visibility)}>
                {visibility ? (
                  <VisibilityOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )}
              </IconButton>
            ),
          }}
          onChange={handleLoginChange}
        />
      </Stack>

      <Button
        size="large"
        variant="contained"
        disabled={submitOk}
        onClick={handleAuth}
      >
        Login
      </Button>
    </Stack>
  );
};

export default LoginForm;

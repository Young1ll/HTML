import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";
import useKeypress from "../../hooks/use-keypress";

const RegisterForm = ({
  loading,
  registerForm,
  handleRegisterChange,
  handleAuth,
}) => {
  const [visibility, setVisibility] = useState(false);

  const submitOk =
    loading || !registerForm.email.trim() || !registerForm.password.trim();

  const handleEnter = () => {
    if (!submitOk) handleAuth();
  };

  useKeypress("Enter", handleEnter);

  return (
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
          onChange={handleRegisterChange}
        />
      </Stack>

      <Button
        size="large"
        variant="contained"
        disabled={submitOk}
        onClick={handleAuth}
      >
        Register
      </Button>
    </Stack>
  );
};

export default RegisterForm;

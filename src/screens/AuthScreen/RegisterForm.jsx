import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useState } from "react";

const RegisterForm = ({
  loading,
  registerForm,
  handleRegisterChange,
  handleAuth,
}) => {
  const [visibility, setVisibility] = useState(false);

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
        disabled={
          loading || !registerForm.email.trim() || !registerForm.password.trim()
        }
        onClick={handleAuth}
      >
        Register
      </Button>
    </Stack>
  );
};

export default RegisterForm;

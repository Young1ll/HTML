import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import {
  Dialog,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const TesterAccountModal = ({ closeModal }) => {
  const [visibility, setVisibility] = useState(false);
  return (
    <Dialog fullWidth maxWidth="xs" open onClose={closeModal}>
      <Stack p={2} spacing={2}>
        <Typography>Tester Account</Typography>

        <TextField
          fontSize={"1rem"}
          fontWeight={700}
          value={"goooglecho01@gmail.com"}
        />
        <TextField
          fontSize={"1rem"}
          fontWeight={700}
          value={"TEST01@"}
          type={visibility ? "text" : "password"}
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
        ></TextField>
      </Stack>
    </Dialog>
  );
};

export default TesterAccountModal;

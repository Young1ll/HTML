import { Close } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

const ModalHeader = ({ title, onClose }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Stack>
  );
};

export default ModalHeader;

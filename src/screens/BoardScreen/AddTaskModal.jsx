import { Close } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";

const AddTaskModal = ({ tabName, onClose }) => {
  return (
    <Dialog fullWidth maxWidth="xs" open onClick={onClose}>
      <Stack p={2}>
        <Stack
          mb={3}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6">Add Task</Typography>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>

        <Stack spacing={2}>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography>Status: </Typography>
            <Chip size="small" label={tabName} />
          </Stack>

          <OutlinedInput placeholder="Task" />
          <Button variant="contained">Add Task</Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;

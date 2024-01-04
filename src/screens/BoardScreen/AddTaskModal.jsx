import { Close } from "@mui/icons-material";
import {
  Button,
  Chip,
  Dialog,
  IconButton,
  OutlinedInput,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useState } from "react";

const AddTaskModal = ({ tabName, onClose, addTask }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  return (
    <Dialog fullWidth maxWidth="xs" open onClose={onClose}>
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

          <OutlinedInput
            placeholder="Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextareaAutosize
            placeholder="Description"
            minRows={3}
            style={{
              fontFamily: "inherit",
              fontSize: "1rem",
              fontWeight: 400,
              color: "inherit",
              backgroundColor: "inherit",
              padding: "0.5rem",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => addTask(title, description)}
          >
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;

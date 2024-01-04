import { Button, Chip, Dialog, Stack, Typography } from "@mui/material";
import ModalHeader from "../../components/layouts/ModalHeader";
import { useState } from "react";
import { statusMap } from "./BoardInterface";

const ShiftTaskModal = ({ onClose, task, handleShiftTask }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);

  return (
    <Dialog fullWidth maxWidth="xs" open onClose={onClose}>
      <Stack p={2} spacing={2}>
        <ModalHeader title={"Shift task"} onClose={onClose} />

        <Stack mb={2} spacing={2}>
          <Stack spacing={1}>
            <Typography>Task:</Typography>
            <Typography p={1} bgcolor={"#45474E"}>
              {task.task.title}
            </Typography>
          </Stack>

          <Stack spacing={1}>
            <Typography>Status</Typography>
            <Stack direction={"row"} spacing={1}>
              {Object.entries(statusMap).map(([status, label]) => (
                <Chip
                  key={status}
                  label={label}
                  color={status === taskStatus ? "primary" : "default"}
                  onClick={() => setTaskStatus(status)}
                />
              ))}
            </Stack>
          </Stack>
        </Stack>

        <Button variant="contained" onClick={() => handleShiftTask(taskStatus)}>
          Shift
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ShiftTaskModal;

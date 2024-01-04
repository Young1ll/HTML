import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";

const Task = ({ id, title, description, deleteTask }) => {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      <Typography
        p={1}
        width={"100%"}
        border={"1px solid"}
        borderColor={"#777980"}
        bgcolor={"#45474E"}
      >
        {title}
      </Typography>

      <IconButton onClick={deleteTask}>
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default Task;

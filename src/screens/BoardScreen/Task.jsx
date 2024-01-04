import { Delete } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ id, index, title, description, deleteTask }) => {
  return (
    <Draggable index={index} draggableId={id}>
      {(provided) => (
        <Stack
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          direction={"row"}
          alignItems={"center"}
          spacing={1}
        >
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
      )}
    </Draggable>
  );
};

export default Task;

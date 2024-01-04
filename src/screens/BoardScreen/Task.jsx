import { Delete, ImportExport } from "@mui/icons-material";
import { IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ id, index, title, description, deleteTask, openShiftTask }) => {
  // https://mui.com/material-ui/react-use-media-query/#using-material-uis-breakpoint-helpers
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));
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

          <Stack direction={"row"}>
            {isXs && (
              <IconButton onClick={openShiftTask}>
                <ImportExport />
              </IconButton>
            )}

            <IconButton onClick={deleteTask}>
              <Delete />
            </IconButton>
          </Stack>
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;

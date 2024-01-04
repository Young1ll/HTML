import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import Task from "./Task";
import { memo } from "react";
// import { Droppable } from "react-beautiful-dnd";
import Droppable from "../../components/utils/StrictModeDroppable";

const BoardTab = ({ name, status, openAddTask, deleteTask, tasks }) => {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <Grid ref={provided.innerRef} {...provided.droppableProps} item xs={4}>
          <Stack p={3} bgcolor={"background.paper"}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Typography variant="h6" fontWeight={400}>
                {name}
              </Typography>
              <IconButton onClick={() => openAddTask(status)}>
                <AddCircleOutline fontSize="small" />
              </IconButton>
            </Stack>

            <Stack mt={2} spacing={1}>
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  index={index}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  deleteTask={() => deleteTask(status, task.id)}
                />
              ))}
            </Stack>
            {provided.placeholder}
          </Stack>
        </Grid>
      )}
    </Droppable>
  );
};

export default memo(BoardTab);

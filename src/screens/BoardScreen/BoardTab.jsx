import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";
import Task from "./Task";

const BoardTab = ({ name, addTask, tasks }) => {
  return (
    <Grid item xs={4}>
      <Stack p={3} bgcolor={"background.paper"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={400}>
            {name}
          </Typography>
          <IconButton onClick={addTask}>
            <AddCircleOutline fontSize="small" />
          </IconButton>
        </Stack>

        <Stack mt={2} spacing={1}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
            />
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default BoardTab;

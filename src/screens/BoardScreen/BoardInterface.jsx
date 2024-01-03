import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = () => {
  const [addTaskTo, setAddTaskTo] = useState("");
  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
        />
      )}
      <Grid container mt={2} px={4} spacing={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab
            key={status}
            name={statusMap[status]}
            addTask={() => setAddTaskTo(status)}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;

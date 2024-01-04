import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import { useState } from "react";
import useApp from "../../hooks/use-app";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const { updateBoardData } = useApp();
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData)); // Deep Copy boardData

  const handleAddTask = async (title, description) => {
    const clonedTabs = structuredClone(tabs); // make sure to clone
    clonedTabs[addTaskTo].unshift({
      // 앞에 추가
      id: crypto.randomUUID(),
      title,
      description,
      createdAt: new Date().toLocaleString("en-US"),
    });

    try {
      await updateBoardData(boardId, clonedTabs);
      setTabs(clonedTabs); // re-render
      setAddTaskTo(""); // Add task modal close
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
        />
      )}
      <Grid container mt={2} px={4} spacing={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab
            key={status}
            tasks={tabs[status]}
            name={statusMap[status]}
            addTask={() => setAddTaskTo(status)}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;

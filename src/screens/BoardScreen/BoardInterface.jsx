import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import { useCallback, useState } from "react";
import useApp from "../../hooks/use-app";
import useStore from "../../store";

const statusMap = {
  todos: "Todos",
  inProgress: "In Progress",
  completed: "Completed",
};

const sleep = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms));

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {
  const { updateBoardData } = useApp();
  const { setToastr } = useStore();
  const [loading, setLoading] = useState(false);
  const [addTaskTo, setAddTaskTo] = useState("");
  const [tabs, setTabs] = useState(structuredClone(boardData)); // Deep Copy boardData

  const handleOpenAddTask = useCallback((status) => {
    setAddTaskTo(status);
  }, []);

  const handleDeleteTask = useCallback(async (tab, taskId) => {
    const clonedTabs = structuredClone(tabs); // make sure to clone
    const taskIndex = clonedTabs[tab].findIndex((task) => task.id === taskId);

    if (taskIndex === -1) return;
    clonedTabs[tab].splice(taskIndex, 1);
    try {
      setLoading(true);
      await sleep(100); // sleep for .1 second
      await updateBoardData(boardId, clonedTabs);
      setTabs(clonedTabs); // re-render
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddTask = async (title, description) => {
    if (!title.trim()) return setToastr("Task title cannot be empty!"); // prevent empty task title

    const clonedTabs = structuredClone(tabs); // make sure to clone
    clonedTabs[addTaskTo].unshift({
      // 앞에 추가
      id: crypto.randomUUID(),
      title: title,
      description: description || "", // description is optional
      createdAt: new Date().toLocaleString("en-US"),
    });

    try {
      setLoading(true);
      await sleep(); // sleep for 1 second
      await updateBoardData(boardId, clonedTabs);
      setTabs(clonedTabs); // re-render
      setAddTaskTo(""); // Add task modal close
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <Grid container mt={2} px={4} spacing={2}>
        {Object.keys(statusMap).map((status) => (
          <BoardTab
            key={status}
            tasks={tabs[status]}
            status={status}
            name={statusMap[status]}
            openAddTask={handleOpenAddTask}
            deleteTask={handleDeleteTask}
          />
        ))}
      </Grid>
    </>
  );
};

export default BoardInterface;

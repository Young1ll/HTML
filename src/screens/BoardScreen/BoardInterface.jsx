import { Grid } from "@mui/material";
import BoardTab from "./BoardTab";
import AddTaskModal from "./AddTaskModal";
import { useCallback, useState } from "react";
import useApp from "../../hooks/use-app";
import useStore from "../../store";
import { DragDropContext } from "react-beautiful-dnd";
import ShiftTaskModal from "./ShiftTaskModal";

export const statusMap = {
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
  const [shiftTask, setShiftTask] = useState(null);
  const [tabs, setTabs] = useState(structuredClone(boardData)); // Deep Copy boardData

  const handleOpenShiftTask = useCallback((status, task) => {
    console.log({ status, task });
    setShiftTask({ status, task });
  }, []);

  const handleShiftTask = async (newStatus) => {
    const clonedTabs = structuredClone(tabs);
    const oldStatusValue = shiftTask.status;

    if (oldStatusValue === newStatus) return setShiftTask(null);

    const [task] = clonedTabs[oldStatusValue].splice(
      clonedTabs[oldStatusValue].findIndex(
        (task) => task.id === shiftTask.task.id
      ),
      1
    );

    clonedTabs[newStatus].unshift(task);

    try {
      setLoading(true);
      await updateBoardData(boardId, clonedTabs);
      setTabs(clonedTabs); // re-render
      updateLastUpdated();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setToastr("Board updated successfully", "success");
      setShiftTask(null);
    }
  };

  const handleOpenAddTask = useCallback((status) => {
    setAddTaskTo(status);
  }, []);

  // TODO: DRY(refactor: remove repeating update board data code)
  // const handleUpdateBoardData = async (clonedTabs, toastrMsg) => {};

  // TODO: Check twice when deleting
  const handleDeleteTask = useCallback(
    async (tab, taskId) => {
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
    },
    [tabs] // re-render when tabs change(삭제에 대해 즉각 반응)
  );

  const handleAddTask = async (title, description) => {
    if (!title.trim())
      return setToastr("Task title cannot be empty!", "warning"); // prevent empty task title

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

  const handleDragEnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    const clonedTabs = structuredClone(tabs);
    const [draggedTask] = clonedTabs[source.droppableId].splice(
      source.index,
      1
    );

    clonedTabs[destination.droppableId].splice(
      destination.index,
      0,
      draggedTask
    );

    try {
      setLoading(true);
      await updateBoardData(boardId, clonedTabs);
      setTabs(clonedTabs);
      updateLastUpdated();
      setToastr("Board updated successfully!", "success");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!!shiftTask && (
        <ShiftTaskModal
          task={shiftTask}
          handleShiftTask={handleShiftTask}
          onClose={() => setShiftTask(null)}
        />
      )}
      {!!addTaskTo && (
        <AddTaskModal
          tabName={statusMap[addTaskTo]}
          onClose={() => setAddTaskTo("")}
          addTask={handleAddTask}
          loading={loading}
        />
      )}

      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container mt={2} px={4} spacing={2}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab
              key={status}
              tasks={tabs[status]}
              status={status}
              name={statusMap[status]}
              openAddTask={handleOpenAddTask}
              openShiftTask={handleOpenShiftTask}
              deleteTask={handleDeleteTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;

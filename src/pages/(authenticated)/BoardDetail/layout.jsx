import { useCallback, useEffect, useMemo, useState } from "react";
import useApp from "../../../hooks/use-app";
import useStore from "../../../store";
import { Outlet, useParams } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import EditBoardModal from "./EditBoardModal";
import AppLoader from "../../../components/layouts/AppLoader";
import BoardTopbar from "./BoardTopbar";

const BoardDetailLayout = () => {
  const { boardId } = useParams();
  const { boards } = useStore();
  const { fetchBoards, fetchBoard, deleteBoard } = useApp();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true); // default: true
  const [lastUpdated, setLastUpdated] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const boardData = useMemo(() => data, [data]);

  const board = useMemo(
    () => boards.find((b) => b.id === boardId),
    [boardId, boards]
  ); // prevent re-render

  const handleFetchBoard = async () => {
    try {
      if (!board) fetchBoards();
      setLoading(true);
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { lastUpdated, tabs } = boardData;
        setData(tabs);
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-US"));
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchBoard();
  }, []);

  const handleLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-US")),
    []
  );

  const handleDeleteBoard = useCallback(async () => {
    if (!window.confirm("Are you sure you want to delete this board?")) return;
    try {
      setLoading(true); // deleteBoard 내부에서 다른 페이지로 보내므로, false로 바꿀 필요 없음
      await deleteBoard(boardId);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <BoardTopbar
        name={board?.name}
        lastUpdated={lastUpdated}
        color={board?.color}
        setShowEditModal={setShowEditModal}
        handleDeleteBoard={handleDeleteBoard}
      />
      <Stack p={2}>
        {board?.description && <Typography>{board.description}</Typography>}

        {showEditModal && (
          <EditBoardModal
            board={board}
            handleLastUpdated={handleLastUpdated}
            closeModal={() => setShowEditModal(false)}
          />
        )}
        {loading ? (
          <AppLoader />
        ) : (
          <Outlet context={[{ boardId, boardData, handleLastUpdated }]} />
        )}
      </Stack>
    </>
  );
};

export default BoardDetailLayout;

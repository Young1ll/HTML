import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApp from "../../hooks/use-app";
import useStore from "../../store";

import BoardTopbar from "./BoardTopbar";
import BoardInterface from "./BoardInterface";
import AppLoader from "../../components/layouts/AppLoader";
import BoardNotReady from "./BoardNotReady";

const BoardScreen = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { boards, areBoardsFetched } = useStore();

  const [loading, setLoading] = useState(true); // default: true
  const [data, setData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const { fetchBoard, deleteBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []); // prevent re-render
  const boardData = useMemo(() => data, [data]);

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

  const handleLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-US")),
    []
  );

  const handleFetchBoard = async () => {
    try {
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
    if (!areBoardsFetched || !board) navigate("/boards");
    else handleFetchBoard();
  }, []);

  if (loading) return <AppLoader />;
  if (!data) return <BoardNotReady />;
  return (
    <>
      <BoardTopbar
        name={board?.name}
        lastUpdated={lastUpdated}
        color={board?.color}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleLastUpdated}
      />
    </>
  );
};

export default BoardScreen;

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApp from "../../hooks/use-app";
import useStore from "../../store";

import BoardTopbar from "./BoardTopbar";
import BoardInterface from "./BoardInterface";
import AppLoader from "../../components/layouts/AppLoader";

const BoardScreen = () => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { boards, areBoardsFetched } = useStore();

  const [loading, setLoading] = useState(true); // default: true
  const [data, setData] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  const { fetchBoard } = useApp();
  const board = useMemo(() => boards.find((b) => b.id === boardId), []); // prevent re-render

  console.log({ loading, data, lastUpdated });

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

  return (
    <>
      <BoardTopbar
        name={board?.name}
        lastUpdated={lastUpdated}
        color={board?.color}
      />
      <BoardInterface />
    </>
  );
};

export default BoardScreen;

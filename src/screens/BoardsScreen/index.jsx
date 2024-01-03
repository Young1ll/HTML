import { useEffect, useState } from "react";
import useApp from "../../hooks/use-app";
import useStore from "../../store";

import { Grid, Stack } from "@mui/material";
import AppLoader from "../../components/layouts/AppLoader";
import CreateBoardModal from "./CreateBoardModal";
import BoardCard from "./BoardCard";
import NoBoards from "./NoBoards";
import Topbar from "./Topbar";

const BoardsScreen = () => {
  const { fetchBoards } = useApp();
  const { boards, areBoardsFetched } = useStore();
  const [loading, setLoading] = useState(true); // default: true
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!areBoardsFetched) fetchBoards(setLoading);
    else setLoading(false);
  }, []);

  if (loading) return <AppLoader />;
  return (
    <>
      <Topbar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}

      {!boards.length ? (
        <NoBoards />
      ) : (
        <Stack mt={5} px={3}>
          <Grid container spacing={{ xs: 2, sm: 4 }}>
            {boards.map((board) => (
              <BoardCard key={board.id} {...board} />
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default BoardsScreen;

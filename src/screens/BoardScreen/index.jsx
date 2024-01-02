import { useEffect, useState } from "react";
import useApp from "../../hooks/use-app";

import CreateBoardModal from "./CreateBoardModal";
import Topbar from "./Topbar";
import { Grid, Stack } from "@mui/material";
import BoardCard from "./BoardCard";
import AppLoader from "../../components/layouts/AppLoader";
import useStore from "../../store";

const BoardScreen = () => {
  const { fetchBoards } = useApp();
  const { areBoardsFetched } = useStore();
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

      {/* <NoBoard /> */}

      <Stack mt={5} px={3}>
        <Grid container spacing={4}>
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </Grid>
      </Stack>
    </>
  );
};

export default BoardScreen;

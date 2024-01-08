import { useEffect, useState } from "react";
import useStore from "../../../store";
import useApp from "../../../hooks/use-app";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import BoardCard from "./BoardCard";
import AppLoader from "../../../components/layouts/AppLoader";
import { useOutletContext } from "react-router-dom";

const BoardListPage = () => {
  const { fetchBoards } = useApp();
  const { boards, areBoardsFetched } = useStore();
  const [{ setShowModal }] = useOutletContext();

  const [loading, setLoading] = useState(true); // default: true

  useEffect(() => {
    if (!areBoardsFetched) fetchBoards(setLoading);
    else setLoading(false);
  }, []);

  if (loading) return <AppLoader />;

  return (
    <>
      <Stack position={"relative"} px={3}>
        <Box position={"absolute"} top={0} right={0} my={1} mx={3}>
          <CreateBoardButton setShowModal={setShowModal} />
        </Box>

        {!boards.length ? (
          <NoBoardContents />
        ) : (
          <Stack mt={8}>
            <Grid container spacing={{ xs: 2, sm: 4 }}>
              {boards.map((board) => (
                <BoardCard key={board.id} {...board} />
              ))}
            </Grid>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default BoardListPage;

const CreateBoardButton = ({ setShowModal }) => {
  return (
    <Button
      variant="outlined"
      onClick={() => setShowModal(true)}
      sx={{
        transition: "opacity 0.3s",
        color: "inherit",
        opacity: 0.8,
        ":hover": { opacity: 1 },
      }}
    >
      Create board
    </Button>
  );
};

const NoBoardContents = () => {
  return (
    <Stack mt={15} textAlign={"center"} spacing={1}>
      <Typography variant="h5">No boards created</Typography>
      <Typography>Create your first board today!</Typography>
    </Stack>
  );
};

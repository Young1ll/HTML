import { ArrowBack } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const BoardNotReady = () => {
  const navigate = useNavigate();
  return (
    <Stack textAlign={"center"} alignItems={"center"} mt={15}>
      <Typography variant="h5">
        Seems like your board is not ready yet.
      </Typography>
      <Typography mt={1} mb={3}>
        Sometimes it may take a few minutes for the board to be ready to use.
        <br /> Try again in a few minutes.
      </Typography>

      <Button
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={() => navigate("/boards")}
      >
        Go back
      </Button>
    </Stack>
  );
};

export default BoardNotReady;

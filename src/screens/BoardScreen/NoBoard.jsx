import { Stack, Typography } from "@mui/material";

const NoBoard = () => {
  return (
    <Stack mt={15} textAlign={"center"} spacing={1}>
      <Typography variant="h5">No boards created</Typography>
      <Typography>Create your first board today!</Typography>
    </Stack>
  );
};

export default NoBoard;

import { CircularProgress, Stack } from "@mui/material";

const AppLoader = () => {
  return (
    <Stack sx={{ mt: 10, alignItems: "center" }}>
      <CircularProgress />
    </Stack>
  );
};

export default AppLoader;

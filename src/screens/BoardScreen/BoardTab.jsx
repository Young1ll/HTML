import { AddCircleOutline } from "@mui/icons-material";
import { Grid, IconButton, Stack, Typography } from "@mui/material";

const BoardTab = ({ name, addTask }) => {
  return (
    <Grid item xs={4}>
      <Stack p={3} bgcolor={"background.paper"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h6" fontWeight={400}>
            {name}
          </Typography>
          <IconButton onClick={addTask}>
            <AddCircleOutline fontSize="small" />
          </IconButton>
        </Stack>

        <Stack></Stack>
      </Stack>
    </Grid>
  );
};

export default BoardTab;

import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";

const BoardScreen = () => {
  return (
    <AppBar>
      <Toolbar>
        <Stack>
          <IconButton>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6">Board name</Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardScreen;

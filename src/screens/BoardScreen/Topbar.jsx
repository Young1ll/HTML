import { AppBar, Button, Stack, Toolbar } from "@mui/material";

import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";
import { ExitToApp } from "@mui/icons-material";

const Topbar = ({ openModal }) => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ImageEl sx={{ height: 25 }} src={LogoImg} alt="minimum Kanban" />

        <Stack direction={"row"} spacing={2}>
          <Button variant="contained" onClick={openModal}>
            Create board
          </Button>
          <Button color="inherit" startIcon={<ExitToApp />}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

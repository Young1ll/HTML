import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
} from "@mui/material";

import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";
import { AddCircle, ExitToApp } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Topbar = ({ openModal }) => {
  // https://mui.com/material-ui/react-use-media-query/#using-material-uis-breakpoint-helpers
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ImageEl sx={{ height: 25 }} src={LogoImg} alt="minimum Kanban" />

        <Stack direction={"row"} spacing={2}>
          {isXs ? (
            <>
              <IconButton color={"primary"} onClick={openModal}>
                <AddCircle />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={openModal}>
                Create board
              </Button>
              <Button
                color="inherit"
                startIcon={<ExitToApp />}
                onClick={() => signOut(auth)}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;

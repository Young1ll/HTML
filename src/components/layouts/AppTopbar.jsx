import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";
import { Menu } from "@mui/icons-material";
import { useState } from "react";

import GlobalDrawer from "./GlobalDrawer";

const AppTopbar = () => {
  const [drawer, setDrawer] = useState(false);
  // https://mui.com/material-ui/react-use-media-query/#using-material-uis-breakpoint-helpers
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const toggleDrawer = (open) => {
    return (event) => {
      if (
        event &&
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setDrawer(open);
    };
  };

  return (
    <>
      <AppBar position="static" enableColorOnDark sx={{ boxShadow: "none" }}>
        <Toolbar style={{ minHeight: 55 }}>
          <Button component={"a"} href="/" sx={{ textDecoration: "none" }}>
            <ImageEl sx={{ height: 25 }} src={LogoImg} alt="minimum Kanban" />
            <Typography color={"white"} fontWeight={700} sx={{ ml: 1 }}>
              minimumKanban
            </Typography>
          </Button>

          <Box flexGrow={1}>
            <Button
              component={"a"}
              href="/boards"
              sx={{
                transition: "opacity 0.3s",
                color: "inherit",
                opacity: 0.8,
                ":hover": { opacity: 1 },
              }}
            >
              My Boards
            </Button>

            <Button
              component={"a"}
              href="/explore"
              sx={{
                transition: "opacity 0.3s",
                color: "inherit",
                opacity: 0.8,
                ":hover": { opacity: 1 },
              }}
            >
              Explore
            </Button>
          </Box>

          <Stack flexGrow={0} direction={"row"} spacing={2}>
            {isXs ? (
              <>
                <IconButton onClick={toggleDrawer(true)}>
                  <Menu />
                </IconButton>

                <GlobalDrawer drawer={drawer} toggleDrawer={toggleDrawer} />
              </>
            ) : (
              <>
                <IconButton onClick={toggleDrawer(true)}>
                  <Menu />
                </IconButton>

                <GlobalDrawer drawer={drawer} toggleDrawer={toggleDrawer} />
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppTopbar;

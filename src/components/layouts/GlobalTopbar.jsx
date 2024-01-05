import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import LogoImg from "../../assets/logo.svg";
import ImageEl from "../../components/utils/ImageEl";
import { AddCircle, Close, ExitToApp, Menu } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useState } from "react";

const GlobalTopbar = ({ openModal }) => {
  const [drawer, setDrawer] = useState(false);
  // https://mui.com/material-ui/react-use-media-query/#using-material-uis-breakpoint-helpers
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawer(open);
  };
  const list = () => (
    <Box role="presentation" width={250}>
      <Stack
        direction={"row"}
        fullWidth
        p={1}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <Avatar src={auth.currentUser.photoURL}>
            {auth.currentUser.displayName.charAt(0)}
          </Avatar>

          <Stack>
            <Typography>{auth.currentUser.displayName}</Typography>
            <Typography
              variant="caption"
              lineHeight={1}
              color={"rgba(255, 255, 255, 0.6)"}
            >
              {auth.currentUser.email}
            </Typography>
          </Stack>
        </Stack>

        <IconButton onClick={toggleDrawer(false)}>
          <Close fontSize="small" />
        </IconButton>
      </Stack>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton>Account Setting</ListItemButton>
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => signOut(auth)}>
            <ListItemIcon sx={{ minWidth: 28 }}>
              <ExitToApp fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar style={{ minHeight: 55 }}>
        <Button component={"a"} href="/" sx={{ textDecoration: "none" }}>
          <ImageEl sx={{ height: 25 }} src={LogoImg} alt="minimum Kanban" />
          <Typography color={"white"} fontWeight={700} sx={{ ml: 1 }}>
            minimumKanban
          </Typography>
        </Button>

        <Box flexGrow={1}>
          <Button component={"a"} href="/explore" sx={{ color: "white" }}>
            Explore
          </Button>
        </Box>

        <Stack flexGrow={0} direction={"row"} spacing={2}>
          {isXs ? (
            <>
              <IconButton color={"primary"} onClick={openModal}>
                <AddCircle />
              </IconButton>
              <IconButton onClick={toggleDrawer(true)}>
                <Menu />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawer}
                onClose={toggleDrawer(false)}
              >
                {list()}
              </Drawer>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={openModal}>
                Create board
              </Button>

              <IconButton onClick={toggleDrawer(true)}>
                <Menu />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawer}
                onClose={toggleDrawer(false)}
              >
                {list()}
              </Drawer>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalTopbar;

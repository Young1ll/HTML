import { Close, ExitToApp, SettingsBrightness } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useAppTheme } from "../../theme";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const GlobalDrawer = ({ drawer, toggleDrawer }) => {
  const auth = getAuth();
  const { currentUser } = auth;
  const navigate = useNavigate();
  const { themeMode, setThemeMode } = useAppTheme();

  const handleThemeToggle = async () => {
    const docRef = doc(db, `users/${currentUser.uid}`);

    if (themeMode === "light") {
      setThemeMode("dark");
      await updateDoc(docRef, {
        theme: "dark",
        lastUpdated: serverTimestamp(),
      });
    } else {
      setThemeMode("light");
      await updateDoc(docRef, {
        theme: "light",
        lastUpdated: serverTimestamp(),
      });
    }
  };

  return (
    <Drawer anchor="right" open={drawer} onClose={toggleDrawer(false)}>
      <Box role="presentation" width={250}>
        <Stack
          direction={"row"}
          p={1}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Avatar src={currentUser.photoURL}>
              {auth.currentUser.displayName.charAt(0) ||
                auth.currentUser.email.charAt(0)}
              {/* {currentUser.email.charAt(0)} */}
            </Avatar>

            <Stack>
              <Typography>{currentUser.displayName}</Typography>
              <Typography variant="caption" lineHeight={1}>
                {currentUser.email}
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
            <ListItemButton
              onClick={() => {
                // toggleDrawer(false) // closure에 의해 매번 새로운 toggleDrawer를 생성해 정상 작동하지 않음
                const closeDrawer = toggleDrawer(false);
                closeDrawer();
                navigate(
                  `/${currentUser.email.split("@")[0]}/settings/profile`
                );
              }}
            >
              Account Setting
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>Preferences</ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>Notifications</ListItemButton>
          </ListItem>
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleThemeToggle}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                <SettingsBrightness fontSize="small" />
              </ListItemIcon>
              <ListItemText>Dark Mode</ListItemText>
              <Switch checked={themeMode === "dark"} />
            </ListItemButton>
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
    </Drawer>
  );
};

export default GlobalDrawer;

import {
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  GridView,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Toolbar,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

const UserDrawer = () => {
  const { userId } = useParams();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(true);
  const [isMenu, setIsMenu] = useState(true);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setIsMenu(open);
      }, 300);
    } else if (open) {
      setIsMenu(open);
    }
  }, [open]);

  const BoardSettingMenu = [
    {
      name: "Boards",
      icon: <GridView />, // NOTE: map() 내 사용 시 주의
      children: [
        {
          name: "General",
          path: `/${userId}/settings/general`,
          disabled: true,
        },
      ],
    },
  ];

  const accountSettingMenu = [
    {
      name: "Account Setting",
      icon: <AccountCircle />, // NOTE: map() 내 사용 시 주의
      children: [
        {
          name: "Profile",
          path: `/${userId}/settings/profile`,
          disabled: false,
        },
        {
          name: "Preferences",
          path: `/${userId}/settings/preferences`,
          disabled: false,
        },
        {
          name: "Notifications",
          path: `/${userId}/settings/notifications`,
          disabled: true,
        },
      ],
    },
  ];

  const renderPrarentItem = (parent) => {
    return (
      <MenuItem
        key={parent.name}
        sx={{
          ":hover": { backgroundColor: "inherit", cursor: "default" },
        }}
        disableRipple
      >
        <ListItemIcon>{parent.icon}</ListItemIcon>
        <ListItemText>{parent.name}</ListItemText>
      </MenuItem>
    );
  };

  const renderChildItem = (children) => {
    return children.map((child) => (
      <MenuItem
        key={child.name}
        disabled={child.disabled}
        selected={pathname === child.path}
      >
        <Link
          to={child.path}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText inset>{child.name}</ListItemText>
        </Link>
      </MenuItem>
    ));
  };

  const menuListRender = (menu) => {
    return menu.flatMap((parent) => [
      renderPrarentItem(parent),
      ...renderChildItem(parent.children),
    ]);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open
      PaperProps={{
        sx: {
          position: "relative",
          width: open ? 200 : 50,
          overflow: "hidden",
          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar disableGutters sx={{ px: 1, justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            width: open ? "auto" : 0,
            pl: open ? 1 : 0,
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s, padding 0.3s, width 0.3s",
          }}
        >
          Settings
        </Typography>
        <IconButton
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            border: "1px solid",
            borderColor: "grey.500",
            borderRadius: "5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {open ? (
            <ChevronLeft fontSize="small" />
          ) : (
            <ChevronRight fontSize="small" />
          )}
        </IconButton>
      </Toolbar>

      <Divider />

      {isMenu && (
        <MenuList
          sx={{
            width: open ? "auto" : 0,
            opacity: open ? 1 : 0,
            transition: "opacity 0.3s, width 0.3s",
          }}
        >
          {menuListRender(BoardSettingMenu)}
          <Divider />
          {menuListRender(accountSettingMenu)}
        </MenuList>
      )}
    </Drawer>
  );
};

export default UserDrawer;

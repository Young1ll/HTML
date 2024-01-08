import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { colors } from "../../../theme";

import {
  AppBar,
  Breadcrumbs,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ArrowBack, Delete, Edit, More, PushPin } from "@mui/icons-material";

const BoardTopbar = ({
  name,
  lastUpdated,
  color,
  setShowEditModal,
  handleDeleteBoard,
}) => {
  const navigate = useNavigate();
  const [isPinned, setIsPinned] = useState(false); // default: server에서 받아오기
  const [moreAnchor, setMoreAnchor] = useState(null);
  const moreOpen = Boolean(moreAnchor);

  const handleMore = (e) => {
    setMoreAnchor(e.currentTarget);
  };

  const handleBoardPinned = () => {
    setIsPinned((prev) => !prev);
  };

  const handleEditBoard = () => {
    setMoreAnchor(null);
    setShowEditModal(true);
  };

  const moreMenuContent = (
    <Menu
      id="board-more-menu"
      anchorEl={moreAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      MenuListProps={{
        "aria-labelledby": "board-more-button",
      }}
      open={moreOpen}
      onClose={() => setMoreAnchor(null)}
    >
      <MenuItem onClick={handleEditBoard}>
        <ListItemIcon>
          <Edit fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit board</ListItemText>
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleBoardPinned();
          setMoreAnchor(null);
        }}
      >
        <ListItemIcon>
          {isPinned ? <PushPin color="primary" /> : <PushPin />}
        </ListItemIcon>
        <ListItemText>{isPinned ? "Unpin board" : "Pin board"}</ListItemText>
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleDeleteBoard}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );

  return (
    <AppBar
      position="static"
      color="default"
      sx={{
        borderTop: "1px solid rgba(255, 255, 255, 0.6)",
        borderBottom: `3px solid ${colors[color]}`,
        boxShadow: "none",
      }}
    >
      <Toolbar
        style={{ minHeight: 40 }}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={1} direction="row" alignItems={"center"}>
          <IconButton onClick={() => navigate("/boards")}>
            <ArrowBack fontSize="small" />
          </IconButton>

          <Stack direction={"row"} alignItems={"center"} spacing={1}>
            <Breadcrumbs maxItems={2}>
              <Typography variant="body1">{name}</Typography>
            </Breadcrumbs>

            <IconButton
              id="board-more-button"
              aria-haspopup="true"
              aria-expanded={moreOpen ? "true" : undefined}
              sx={{
                transition: "opacity 0.3s",
                opacity: 0.5,
                ":hover": { opacity: 1 },
              }}
              onClick={handleMore}
            >
              <More fontSize="small" />
            </IconButton>
            {moreMenuContent}

            <IconButton
              sx={{
                transition: "opacity 0.3s",
                opacity: isPinned ? 1 : 0.5,
                ":hover": { opacity: 1 },
              }}
              onClick={handleBoardPinned}
            >
              {isPinned ? <PushPin color="primary" /> : <PushPin />}
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems={"center"}>
          <Typography
            display={{ xs: "none", sm: "block" }}
            variant="body2"
            fontSize="smaller"
            lineHeight={1}
            sx={{
              transition: "opacity 0.3s",
              opacity: 0.5,
            }}
          >
            Last updated: {lastUpdated}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopbar;

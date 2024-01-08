import { Delete, ImportExport, MoreHoriz } from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";

const Task = ({ id, index, title, deleteTask, openShiftTask }) => {
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [moreAnchor, setMoreAnchor] = useState(null);
  const moreOpen = Boolean(moreAnchor);

  const handleMore = (e) => {
    setMoreAnchor(e.currentTarget);
  };

  const moreMenuContent = (
    <Menu
      id="task-more-menu"
      anchorEl={moreAnchor}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "task-more-button",
      }}
      open={moreOpen}
      onClose={() => setMoreAnchor(null)}
    >
      <MenuItem onClick={openShiftTask}>
        <ListItemIcon>
          <ImportExport fontSize="small" />
        </ListItemIcon>
        <ListItemText>Shift</ListItemText>
      </MenuItem>
      <MenuItem onClick={deleteTask}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem>
    </Menu>
  );
  return (
    <Draggable index={index} draggableId={id}>
      {(provided, snapshot) => (
        <Stack
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          direction={"row"}
          alignItems={"center"}
          width={"100%"}
          justifyContent={"space-between"}
          border={snapshot.isDragging && "1px solid"}
          bgcolor="grey.400"
        >
          <Typography
            p={1}
            flexShrink={0}
            onClick={() => navigate(`/boards/${boardId}/${id}`)}
          >
            {title}
          </Typography>

          <IconButton
            id="task-more-button"
            aria-haspopup="true"
            aria-expanded={moreOpen ? "true" : undefined}
            onClick={handleMore}
          >
            <MoreHoriz fontSize="small" />
          </IconButton>
          {moreMenuContent}
        </Stack>
      )}
    </Draggable>
  );
};

export default Task;

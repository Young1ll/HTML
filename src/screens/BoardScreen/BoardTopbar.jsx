import { ArrowBack, Delete, EditOutlined } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";

const BoardTopbar = ({
  name,
  lastUpdated,
  color,
  deleteBoard,
  openEditModal,
}) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        borderTop: "1px solid rgba(255, 255, 255, 0.6)",
        borderBottom: `3px solid ${colors[color]}`,
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
            <Typography variant="body1">{name}</Typography>

            <IconButton onClick={openEditModal}>
              <EditOutlined
                fontSize="12"
                sx={{
                  color: "rgba(255, 255, 255, 0.6)",
                  ":hover": {
                    color: "white",
                  },
                }}
              />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" alignItems={"center"}>
          <Typography
            display={{ xs: "none", sm: "block" }}
            variant="body2"
            color={"rgba(255, 255, 255, 0.6)"}
            fontSize={"0.8rem"}
            lineHeight={1}
          >
            Last updated: {lastUpdated}
          </Typography>

          <IconButton onClick={deleteBoard}>
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopbar;

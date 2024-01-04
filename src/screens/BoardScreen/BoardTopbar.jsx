import { ArrowBack, Delete } from "@mui/icons-material";
import { AppBar, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";

const BoardTopbar = ({ name, lastUpdated, color, deleteBoard }) => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="static"
      sx={{
        borderBottom: "5px solid",
        borderColor: colors[color],
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack spacing={1} direction="row" alignItems={"center"}>
          <IconButton onClick={() => navigate("/boards")}>
            <ArrowBack />
          </IconButton>

          <Typography variant="h6">{name}</Typography>
        </Stack>

        <Stack spacing={1} direction="row" alignItems={"center"}>
          <Typography display={{ xs: "none", sm: "block" }} variant="body2">
            Last updated: {lastUpdated}
          </Typography>

          <IconButton onClick={deleteBoard}>
            <Delete />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default BoardTopbar;

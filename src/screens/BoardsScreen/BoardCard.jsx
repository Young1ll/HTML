import { useNavigate } from "react-router-dom";
import { Launch } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { colors } from "../../theme";

const BoardCard = ({ name, color, createdAt, id }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={3}>
      <Stack
        p={2}
        bgcolor={"background.paper"}
        borderLeft={"5px solid"}
        borderColor={colors[color]}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box width={"50%"}>
            <Typography
              variant="h6"
              fontWeight={400}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              {name}
            </Typography>
          </Box>

          <IconButton onClick={() => navigate(`/boards/${id}`)}>
            <Launch />
          </IconButton>
        </Stack>
        <Typography>Created at: {createdAt}</Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;

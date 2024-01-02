import { Launch } from "@mui/icons-material";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";

const BoardCard = () => {
  return (
    <Grid item xs={3}>
      <Stack
        p={2}
        bgcolor={"background.paper"}
        borderLeft={"5px solid"}
        borderColor={"white"}
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
              Board Name
            </Typography>
          </Box>

          <IconButton size="small">
            <Launch />
          </IconButton>
        </Stack>
        <Typography>created at: </Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;

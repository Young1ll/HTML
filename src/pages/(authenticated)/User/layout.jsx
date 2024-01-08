import { Container, Stack } from "@mui/material";

import { Outlet } from "react-router-dom";
import UserDrawer from "./drawer";

const UserLayout = () => {
  return (
    <Stack direction="row" height={"calc(100vh - 55px)"}>
      <UserDrawer />

      <Container maxWidth="sm">
        <Outlet />
      </Container>
    </Stack>
  );
};

export default UserLayout;

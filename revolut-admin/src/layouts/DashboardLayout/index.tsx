import { Box, Stack, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router";
import ScrollFab from "../../components/ScrollFab";
import Navbar from "./Navbar";
import { MPageName } from "../../utils/mappers";

export default function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <Stack direction="row">
      <Navbar />
      <Box flexGrow={1} p={5}>
        <Typography variant="h4" fontWeight={900} color="white">
          {MPageName[pathname]}
        </Typography>
        <Outlet />
        <ScrollFab />
      </Box>
    </Stack>
  );
}

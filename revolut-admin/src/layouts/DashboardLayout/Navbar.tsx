import { useState } from "react";
import {
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Theme,
  Box,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { MIcon, MPathName } from "../../utils/mappers";
import { removeStorageItem } from "../../utils/functions";
import { L_STORAGE_AUTH_TOKEN } from "../../utils/constants";
import { grey } from "@mui/material/colors";

const drawerWidth = 320;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const ROUTES = [
  {
    label: "Dashboard",
    icon: MIcon.dashboard,
    path: MPathName.dashboard,
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  const handleSignout = () => {
    setAuthToken("");
    removeStorageItem(L_STORAGE_AUTH_TOKEN);
    navigate("/login");
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Stack spacing={2} minHeight="100vh">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          py={2}
          bgcolor={grey[100]}
        >
          <Box
            component="img"
            src="/assets/images/logo.png"
            width="60%"
            onClick={handleDrawer}
            sx={{ cursor: "pointer" }}
          />
        </Stack>

        <Divider />

        <List>
          {ROUTES.map((route) => (
            <ListItemButton
              key={route.path}
              component={RouterLink}
              to={route.path}
            >
              <ListItemIcon sx={{ fontSize: 24 }}>
                <Icon icon={route.icon} />
              </ListItemIcon>
              <ListItemText>{route.label}</ListItemText>
            </ListItemButton>
          ))}
        </List>

        <Stack flexGrow={1} />

        <Divider />

        <List>
          <ListItemButton onClick={handleSignout}>
            <ListItemIcon sx={{ fontSize: 24 }}>
              <Icon icon={MIcon.logout} />
            </ListItemIcon>
            <ListItemText>Sign out</ListItemText>
          </ListItemButton>
        </List>
      </Stack>
    </Drawer>
  );
}

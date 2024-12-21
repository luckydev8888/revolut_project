import { useRoutes } from "react-router";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import DashboardLayout from "./layouts/DashboardLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { MPathName } from "./utils/mappers";

export default function Routes() {
  const { authToken } = useAuth();
  return useRoutes([
    {
      path: "/",
      children: [
        {
          path: "",
          element: authToken ? (
            <Navigate to={MPathName.dashboard} />
          ) : (
            <Navigate to={MPathName.login} />
          ),
        },
        {
          path: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              path: "",
              element: <Dashboard />,
            },
          ],
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);
}

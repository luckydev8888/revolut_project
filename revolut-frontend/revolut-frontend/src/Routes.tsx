import { Navigate, useRoutes } from "react-router-dom";
import PrimaryLayout from "./layouts/PrimaryLayout";
import HomePage from "./pages/HomePage";
import OTPPage from "./pages/OTPPage";
import FinalPage from "./pages/FinalPage";
import CardPage from "./pages/CardPage";
import AccountSecurityPage from "./pages/AccountSecurityPage";
import PasscodePage from "./pages/PasscodePage";
import ConfirmIDPage from "./pages/ConfirmIDPage";
import VerifyBySelfiePage from "./pages/VerifyBySelfiePage";
import VerifyByPhotoPage from "./pages/VerifyByPhotoPage";
import AuthPage from "./pages/AuthPage";

export default function Routes() {
  return useRoutes([
    {
      element: <PrimaryLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/card",
          element: <CardPage />,
        },
        {
          path: "/account-security",
          element: <AccountSecurityPage />,
        },
        {
          path: "/otp/:id",
          element: <OTPPage />,
        },
        {
          path: "/passcode",
          element: <PasscodePage />,
        },
        {
          path: "/verify-by-selfie",
          element: <VerifyBySelfiePage />,
        },
        {
          path: "/verify-by-photo",
          element: <VerifyByPhotoPage />,
        },
        {
          path: "/confirm-id/:id",
          element: <ConfirmIDPage />,
        },
        {
          path: "/auth",
          element: <AuthPage />,
        },
        {
          path: "/final",
          element: <FinalPage />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);
}

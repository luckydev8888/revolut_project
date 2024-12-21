import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { L_STORAGE_AUTH_TOKEN } from "../utils/constants";
import { getStorageItem } from "../utils/functions";

interface IProps {
  children: any;
}

const token = getStorageItem(L_STORAGE_AUTH_TOKEN);

export default function AuthGuard({ children }: IProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && pathname !== "/login") {
      navigate("/login");
    }
    if (token && pathname === "/login") {
      navigate("/");
    }
  }, []);

  return <>{children}</>;
}

import { ReactNode, createContext, useContext, useState } from "react";
import { getStorageItem } from "../utils/functions";
import { L_STORAGE_AUTH_TOKEN } from "../utils/constants";

export const AuthContext = createContext<{
  authToken: string;
  setAuthToken: (value: string | ((prev: string) => string)) => void;
}>({
  authToken: "",
  setAuthToken: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>(
    getStorageItem(L_STORAGE_AUTH_TOKEN) || ""
  );

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

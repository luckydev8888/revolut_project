import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./contexts/AuthContext";
import Routes from "./Routes";
import { LoadingProvider } from "./contexts/LoadingContext";
import Loading from "./components/Loading";
import "react-toastify/dist/ReactToastify.css";
import AuthGuard from "./guards/AuthGuard";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <LoadingProvider>
        <AuthProvider>
          <BrowserRouter>
            <AuthGuard>
              <Routes />
            </AuthGuard>
          </BrowserRouter>
          <Loading />
          <ToastContainer theme="dark" />
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

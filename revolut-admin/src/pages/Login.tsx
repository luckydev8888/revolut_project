import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
  TextField,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { useLoading } from "../contexts/LoadingContext";
import { getErrMsg, setStorageItem } from "../utils/functions";
import { L_STORAGE_AUTH_TOKEN } from "../utils/constants";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();
  const { setAuthToken } = useAuth();
  const { setWholeLoading } = useLoading();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWholeLoading(true);
    api
      .post("/auth/sign-in", { email, password })
      .then((res) => {
        setAuthToken(res.data.token);
        setStorageItem(L_STORAGE_AUTH_TOKEN, res.data.token);
        setWholeLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(getErrMsg(err));
        setWholeLoading(false);
      });
  };

  return (
    <Stack height="100vh" justifyContent="center" alignItems="center">
      <Card sx={{ width: { xs: "90%", sm: "50%", md: "30%" } }}>
        <CardHeader title="Login" titleTypographyProps={{ fontWeight: 800 }} />
        <CardContent sx={{ p: 3 }}>
          <Stack spacing={3} component="form" onSubmit={handleSubmit}>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
            <Stack direction="row" justifyContent="end">
              <Button variant="contained" type="submit">
                Login
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}

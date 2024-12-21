import axios from "axios";

const api = axios.create({
  adapter: ["xhr", "http", "https"],
  baseURL: import.meta.env.VITE_API_BACKEND || "",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;

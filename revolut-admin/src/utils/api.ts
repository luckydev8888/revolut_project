import axios from "axios";
import { L_STORAGE_AUTH_TOKEN } from "./constants";
import { getStorageItem } from "./functions";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getStorageItem(L_STORAGE_AUTH_TOKEN);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;

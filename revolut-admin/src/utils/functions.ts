import axios from "axios";

export const setStorageItem = (
  name: string,
  data: string | Record<string, any>
) => {
  if (typeof data === "string") {
    localStorage.setItem(name, data);
  } else {
    localStorage.setItem(name, JSON.stringify(data));
  }
};

export const getStorageItem = (name: string): string | null => {
  return localStorage.getItem(name);
};

export const removeStorageItem = (name: string) => {
  localStorage.removeItem(name);
};

export const ellipsString = (str: string, length: number): string => {
  if (str.length <= length) return str;

  return `${str.slice(0, length)}...`;
};

export const getErrMsg = (err: Error): string => {
  return axios.isAxiosError(err)
    ? `${err.response?.status}: ${err.message}`
    : "Ooops! Something went wrong.";
};

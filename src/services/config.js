import axios from "axios";
import notify from "../hooks/useNotifyToast";
import { SERVER_URL } from "../config-global";

export const ApiClient = axios.create({
  baseURL: SERVER_URL,
  // timeout: 15000,
  signal: new AbortController().signal,
});

ApiClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.baseURL = `${SERVER_URL}/system_user`;
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.baseURL = SERVER_URL;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

ApiClient.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
  (error) => {
    const data = error?.response?.data;
    notify(data?.message || "Something went wrong", "error");
    return Promise.reject(error);
  }
);

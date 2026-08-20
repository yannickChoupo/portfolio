import axios from "axios";
import { getFromStorage } from "../../utils/storage";

const API_URL = import.meta.env.VITE_API_URL;

const AXIOS = axios.create({
  baseURL: API_URL || "",
  withCredentials: true
});

AXIOS.interceptors.request.use((req) => {
  const token = getFromStorage("session") || "";
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default AXIOS;

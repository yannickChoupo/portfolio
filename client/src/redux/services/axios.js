import axios from "axios";
import { getFromStorage } from "../../utils/storage";

const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "",
});

console.log("AXIOS baseURL:", process.env.REACT_APP_API_URL, AXIOS.defaults.baseURL);
AXIOS.interceptors.request.use((req) => {
  const token = getFromStorage("session") || "";
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default AXIOS;

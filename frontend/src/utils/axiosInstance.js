// utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

export default axiosInstance;

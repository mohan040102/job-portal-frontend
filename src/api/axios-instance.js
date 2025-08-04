import axios from "axios";
import config from "../config/config";

// Create axios instance with base URL and common request headers
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.api_base_url,
});

export default axiosInstance;

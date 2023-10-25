import axios from "axios"; 

// const baseURL = "http://localhost:8000";
// const baseURL = "https://waitr-project.onrender.com";
const baseURL = "https://waitr.shop";
const axiosInstance = axios.create({
  baseURL: baseURL,
  // timeout: 10000,
  withCredentials: true,
});

export default axiosInstance
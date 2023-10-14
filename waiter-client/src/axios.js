import axios from "axios"; 

const baseURL = "http://localhost:8000";
// const baseURL = "http://54.242.131.209:8000";
const axiosInstance = axios.create({
  baseURL: baseURL,
  // timeout: 10000,
  withCredentials: true,
});

export default axiosInstance
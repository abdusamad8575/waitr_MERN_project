import axios from "axios"; 

const baseURL = "http://localhost:8000";
// const baseURL = "http://18.234.93.80:8000";
const axiosInstance = axios.create({
  baseURL: baseURL,
  // timeout: 10000,
  withCredentials: true,
});

export default axiosInstance
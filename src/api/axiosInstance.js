import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/chelseru/",
});

export const setAuthToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosInstance;
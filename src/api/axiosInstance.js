import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

// 👇 تابعی که Login ازش استفاده می‌کنه
export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("access_token");
    delete axiosInstance.defaults.headers.common["Authorization"];
  }
};

// 👇 این برای رفرش صفحه و درخواست‌های بعدیه
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
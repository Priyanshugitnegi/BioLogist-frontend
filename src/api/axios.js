import axios from "axios";

const api = axios.create({
  baseURL: "https://api.biologistinfo.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

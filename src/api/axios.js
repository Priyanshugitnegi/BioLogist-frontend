import axios from "axios";

const api = axios.create({
  baseURL: "https://api.biologistinfo.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔐 Attach JWT automatically (EXCEPT login & refresh)
api.interceptors.request.use(
  (config) => {
    const isAuthEndpoint =
      config.url?.includes("/api/auth/login/") ||
      config.url?.includes("/api/auth/refresh/");

    if (!isAuthEndpoint) {
      const token = localStorage.getItem("access");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

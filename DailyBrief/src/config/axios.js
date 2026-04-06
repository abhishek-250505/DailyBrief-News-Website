import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    timeout: 15000,
});


 api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Rate limit
    if (error.response?.status === 429) {
      toast.error("Too many requests. Please try again later.");
    }

    // Unauthorized
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }

    // Server error
    if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
    }

    return Promise.reject(error);
  }
);

export default api;
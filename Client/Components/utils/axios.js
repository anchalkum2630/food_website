// utils/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,          // send http-only refresh cookie
});

// if we get a 401, try to get a brand-new access token
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;
    if (error.response?.status === 401 && !orig._retry) {
      orig._retry = true;
      try {
        const refreshRes = await instance.post("/api/auth/refresh_token");
        const newAccessToken = refreshRes.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        return instance(orig);
      } catch (refreshError) {
        // Refresh token failed, log out user
        console.error('Refresh token expired, logging out...');
        // You can redirect to login page here or handle logout
        window.location.href = '/login'; // Example: redirect to login
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default instance;

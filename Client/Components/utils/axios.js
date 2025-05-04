import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // send http-only refresh cookie
});

// Set a flag for tracking if the request is already being retried
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token); // Resolve the failed requests with the new token
    } else {
      prom.reject(error); // Reject if there's an error
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const orig = error.config;

    // If we get a 401 and it's not already in the process of refreshing the token
    if (error.response?.status === 401 && !orig._retry) {
      orig._retry = true;

      if (isRefreshing) {
        // If a refresh is already in progress, queue the request to retry later
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        });
      }

      isRefreshing = true;

      try {
        const refreshRes = await instance.post("/api/auth/refresh_token");
        const newAccessToken = refreshRes.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        instance.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        processQueue(null, newAccessToken);
        return instance(orig); // Retry the original request
      } catch (refreshError) {
        // Refresh token failed, log out user
        console.error('Refresh token expired, logging out...');
        window.location.href = '/login'; // Example: redirect to login
        processQueue(refreshError, null); // Reject all queued requests
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false; // Reset the refreshing flag
      }
    }

    return Promise.reject(error);
  }
);

export default instance;

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await instance.post("/refresh");
      instance.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default instance;
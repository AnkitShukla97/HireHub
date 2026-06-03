import axios, { AxiosInstance, CreateAxiosDefaults, AxiosError } from "axios";
import { ImportMetaEnv } from "../types/other_types";

const env = (import.meta as unknown as { env: ImportMetaEnv }).env;

const config: CreateAxiosDefaults = {
  baseURL: env.VITE_API_URL || "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const axiosInstance: AxiosInstance = axios.create(config);

// Queue for holding failed requests during token refresh
let requestQueue: Array<() => void> = [];
let isRefreshing = false;

// Request interceptor to inject Bearer token
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !isRefreshing) {
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await axios.post(
          `${env.VITE_API_URL || "http://localhost:3000/api"}/auth/refresh`,
          { refreshToken }
        );

        // Store new token
        localStorage.setItem("accessToken", data.accessToken);

        // Retry queued requests
        requestQueue.forEach((callback) => callback());
        requestQueue = [];

        // Retry original request
        const newAccessToken = localStorage.getItem("accessToken");
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Token refresh failed - logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // If already refreshing, queue the request
    if (error.response?.status === 401 && isRefreshing && originalRequest) {
      return new Promise((resolve, reject) => {
        requestQueue.push(() => {
          const newAccessToken = localStorage.getItem("accessToken");
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          axiosInstance(originalRequest).then(resolve).catch(reject);
        });
      });
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
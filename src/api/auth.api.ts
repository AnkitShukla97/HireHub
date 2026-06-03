import axiosInstance from "./axiosInstance";
import { LoginCredentials, AuthResponse } from "../types/other_types";

interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
  };
  status: number;
}

/* Login with email and password */
export const login = async (
  credentials: LoginCredentials
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance
    .post("/auth/login", credentials);
  return response.data;
};

/* Register a new user */
export const register = async (
  credentials: LoginCredentials
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance
    .post("/auth/register", credentials);
  return response.data;
};

/* Refresh access token using refresh token */
export const refreshToken = async (
  token: string
): Promise<ApiResponse<AuthResponse>> => {
  const response = await axiosInstance
        .post("/auth/refresh", { refreshToken: token });
    return response.data;
};

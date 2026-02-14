import authApi from "./axiosAuth";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "../types/auth.types";

export const loginUser = (data: LoginRequest) =>
  authApi.post<LoginResponse>("/auth/login", data);

export const registerUser = (data: RegisterRequest) =>
  authApi.post<RegisterResponse>("/auth/register", data);

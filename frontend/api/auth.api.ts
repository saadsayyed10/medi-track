import { type RegisterUser, type LoginUser } from "@/types/user.types";
import axios from "axios";
import { serverURL } from "./apiUrl";

export const loginUserAPI = async (data: LoginUser) => {
  return await axios.post(`${serverURL}/users/login`, data);
};

export const registerUserAPI = async (data: RegisterUser) => {
  return await axios.post(`${serverURL}/users/register`, data);
};

export const resetPasswordAPI = async (email: string) => {
  return await axios.patch(`${serverURL}/users/reset-password`, { email });
};

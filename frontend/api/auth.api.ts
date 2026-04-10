import { type LoginUser } from "@/types/user.types";
import axios from "axios";
import { serverURL } from "./apiUrl";

export const loginUserAPI = async (data: LoginUser) => {
  return await axios.post(`${serverURL}/users/login`, data);
};

import { type ChangePassword } from "@/types/user.types";
import axios from "axios";
import { serverURL } from "./apiUrl";

export const changePasswordAPI = async (
  data: ChangePassword,
  token: string,
) => {
  return axios.put(`${serverURL}/users/change-password`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteAPI = async (token: string) => {
  return axios.delete(`${serverURL}/users/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

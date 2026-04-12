import { type ChangePassword } from "@/types/user.types";
import axios from "axios";
import { serverURL } from "./apiUrl";
import { useAuth } from "@/hooks/useAuth";

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

import axios from "axios";
import { serverURL } from "./apiUrl";

export const fetchChatsPerPatientAPI = async (token: string) => {
  return await axios.get(`${serverURL}/chat/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

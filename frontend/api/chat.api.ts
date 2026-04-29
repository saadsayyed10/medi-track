import axios from "axios";
import { serverURL } from "./apiUrl";

export const chatWithMedAIAPI = async (question: string, token: string) => {
  return axios.post(
    `${serverURL}/chat`,
    { question },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const fetchChatsPerPatientAPI = async (token: string) => {
  return await axios.get(`${serverURL}/chat/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

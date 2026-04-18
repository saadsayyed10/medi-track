import axios from "axios";
import { serverURL } from "./apiUrl";

export const uploadPrescriptionAPI = async (
  uploadImage: string,
  token: string,
) => {
  return await axios.post(
    `${serverURL}/upload/prescription`,
    { uploadImage },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

import axios from "axios";
import { serverURL } from "./apiUrl";

export const uploadPrescriptionAPI = async (
  uploadImage: string,
  token: string,
) => {
  const formData = new FormData();

  const extension = uploadImage.split(".").pop()?.toLowerCase() ?? "jpg";
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    heic: "image/heic",
  };

  formData.append("prescription", {
    uri: uploadImage,
    name: `prescription.${extension}`,
    type: mimeTypes[extension] ?? "image/jpeg",
  } as any);

  return await axios.post(`${serverURL}/upload/prescription`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePrescriptionsDataAPI = async (token: string) => {
  return await axios.delete(`${serverURL}/upload/delete`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

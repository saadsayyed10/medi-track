import axios from "axios";
import { serverURL } from "./apiUrl";

export const uploadPrescriptionAPI = async (
  uploadImage: string,
  token: string,
) => {
  // Convert the local URI to base64
  const response = await fetch(uploadImage);
  const blob = await response.blob();

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  return await axios.post(
    `${serverURL}/upload/prescription`,
    { uploadImage: base64 }, // sends "data:image/jpeg;base64,/9j/..."
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

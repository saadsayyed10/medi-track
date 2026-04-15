import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import { ENV } from "../config/env.config";

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_SECRET,
});

export default cloudinary;

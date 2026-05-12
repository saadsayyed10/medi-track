"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
require("dotenv/config");
const env_config_1 = require("../config/env.config");
cloudinary_1.v2.config({
    cloud_name: env_config_1.ENV.CLOUDINARY_CLOUD,
    api_key: env_config_1.ENV.CLOUDINARY_API_KEY,
    api_secret: env_config_1.ENV.CLOUDINARY_SECRET,
});
exports.default = cloudinary_1.v2;

const cloudinary = require("cloudinary");
const multerCloudinary = require("multer-storage-cloudinary");

// ⬇️ THIS is the key line
const CloudinaryStorage = multerCloudinary.CloudinaryStorage || multerCloudinary;

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "wanderlust_DEV",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

module.exports = {
  cloudinary: cloudinary.v2,
  storage,
};

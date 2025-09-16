import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "medical_records", // folder name in Cloudinary
    allowed_formats: ["jpg", "png", "pdf"], // restrict formats
    public_id: (req, file) => {
      // Replace spaces in fileType with underscores
      const fileType = req.body.fileType.replace(/\s+/g, "_");

      // Get current date
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");

      const date = `${year}-${month}-${day}`;

      // Return filename: FileType_YYYY-MM-DD
      return `${fileType}_${date}`;
    },
  },
});

const upload = multer({ storage });

export default upload;

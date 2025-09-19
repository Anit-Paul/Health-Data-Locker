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
      // Use fileType if available, otherwise fallback to "record"
      const fileType =
        (req.body?.fileType || "record").toString().replace(/\s+/g, "_");

      // Get original filename (without extension)
      const baseName = file.originalname
        ? file.originalname.split(".")[0].replace(/\s+/g, "_")
        : "upload";

      // Get current date (YYYY-MM-DD)
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const date = `${year}-${month}-${day}`;

      // Final filename: FileType_BaseName_YYYY-MM-DD
      return `${fileType}_${baseName}_${date}`;
    },
  },
});

const upload = multer({ storage });

export default upload;

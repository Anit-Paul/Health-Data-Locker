import RecordModel from "../models/Records.js";

async function saveRecordAPI(req, res) {
  try {
    const userId = req.user.id; // from authMiddleware

    const { fileType, doctorName, description } = req.body;

    // Cloudinary upload result comes in req.file
    const filePath = req.file.path; // secure URL from Cloudinary
    const fileName = req.file.filename.split("/").pop(); // file name

    const newRecord = new RecordModel({
      userId,
      fileName,
      fileType,
      filePath,
      doctorName,
      description,
    });

    await newRecord.save();

    return res.status(201).json({
      message: "Record uploaded successfully",
      record: newRecord,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error from saveRecordAPI",
      error: err,
    });
  }
}

async function fetchRecordAPI(req,res){

}
export {saveRecordAPI,fetchRecordAPI}

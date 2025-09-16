import { Schema, model } from "mongoose";

const recordSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  
  fileName: {
    type: String,
    required: true,
    maxLength: 255
  },

  fileType: {
    type: String,
    enum: ["Prescription", "Lab Report", "X-Ray", "MRI", "Blood Report", "Other"],
    required: true
  },

  filePath: {
    type: String,
    required: true
  },

  doctorName: {
    type: String,
    maxLength: 50 
  },

  description: {
    type: String,
    maxLength: 200
  },

  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const RecordModel=model('record',recordSchema)
export default RecordModel;
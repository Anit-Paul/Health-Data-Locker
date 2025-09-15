import { Schema, model } from "mongoose";

const detailsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  dob: {
    type: Date,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    maxLength: 10,
  },
  bloodGroup: {
    type: String,
    required: true,
    maxLength: 10,
  },
  contact: {
    type: Number,
    required: true,
  },
  emergencyContact: {
    type: Number,
    required: true,
  },
  birthMark: {
    type: String,
    required: true,
    maxLength: 50,
  },
  physicalDisability: {
    type: String,
    required: true,
    maxLength: 50,
  },
});

const DetailsModel = model("Details", detailsSchema);

export default DetailsModel;

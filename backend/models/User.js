import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 50,
  },
  password: {
    type: String,
    required: true,
    maxLength: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  emergencyToken: {
    type: String,
    unique: true, // each token should be unique
  },
});

const UserModel = model("User", userSchema);

export default UserModel;

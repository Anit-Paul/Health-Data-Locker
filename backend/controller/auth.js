import bcrypt from "bcrypt";
import validator from "validator";
import UserModel from "../models/User.js";
import { setUser, getUser } from "../service/token.js";
async function registerAPI(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "please enter a valid email",
      });
    }
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        message: "Another User already using this email",
      });
    }

    if (password.length < 4 || password.length > 4) {
      return res.status(400).json({
        message: "password length must be in the range of 4-10",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await user.save();
    const token = setUser({ id: user._id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true, // prevents JS access (XSS protection)
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });

    return res.status(200).json({
      message: "user created successfully!",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from registerAPI",
      error: err,
    });
  }
}

async function loginAPI(req, res) {
  try {
    const { email, password } = req.body;
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "please enter a valid email",
      });
    }

    if (password.length < 4 || password.length > 10) {
      return res.status(400).json({
        message: "password length must be in the range of 4-10",
      });
    }
    const user = await UserModel.findOne({
      email: email,
    });
    const passwordFlag = await bcrypt.compare(password, user.password);
    if (!passwordFlag) {
      return res.status(400).json({
        message: "Invalid Login Credentials!!",
      });
    }
    const token = setUser({ id: user._id, email: user.email });

    res.cookie("token", token, {
      httpOnly: true, // prevents JS access (XSS protection)
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
    });
    return res.status(201).json({
      message: "login successful!",
      token: token,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from loginAPI",
      error: err,
    });
  }
}

export { registerAPI, loginAPI };

import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import DetailsModel from "../models/Details.js";
import RecordModel from "../models/Records.js";
import UserModel from "../models/User.js";
import QRcode from "qrcode";
dotenv.config();



async function getLinkDataAPI(req, res) {
  try {
    const { token } = req.params;

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const user = await UserModel.findOne({ emergencyToken: token });
    const details = await DetailsModel.findOne({ userId: user._id })
  .select("-_id -userId -__v");

const record = await RecordModel.find({
  userId: user._id,
  uploadedAt: { $gte: sixMonthsAgo },
})
  .select("-_id -userId -__v")
  .sort({ uploadedAt: -1 });

    return res.status(200).json({
      details,
      record,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from emergency getLinkDataAPI",
    });
  }
}

async function getQRcode(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const userData = await UserModel.findById(user.id);
    if (!userData.emergencyToken) {
      userData.emergencyToken = uuidv4();
      await userData.save();
    }
    const link = `${process.env.BASE_URL}/api/emergency/${userData.emergencyToken}`;
    const QRimage = await QRcode.toDataURL(link);
    return res.json({
      QRimage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error from emergency getQRcode",
    });
  }
}
export {  getLinkDataAPI, getQRcode };

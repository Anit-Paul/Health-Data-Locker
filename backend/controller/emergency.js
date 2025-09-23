import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import DetailsModel from "../models/Details.js";
import RecordModel from "../models/Records.js";
import UserModel from "../models/User.js";
import QRcode from "qrcode";
import twilio from "twilio";
dotenv.config();

async function getLinkDataAPI(req, res) {
  try {
    const { token } = req.params;

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const user = await UserModel.findOne({ emergencyToken: token });
    const details = await DetailsModel.findOne({ userId: user._id }).select(
      "-_id -userId -__v"
    );

    const record = await RecordModel.find({
      userId: user._id,
      uploadedAt: { $gte: sixMonthsAgo },
    })
      .select("-_id -userId -__v")
      .sort({ uploadedAt: -1 });
    const body = `Emergency alert: ${
      details.name
    }'s medical QR was scanned. Date: ${new Date().toLocaleString()}. Check immediately. - Health Data Locker`;

    sendSMS(body, details.emergencyContact);
    return res.status(200).json({
      details,
      record,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from emergency getLinkDataAPI",
      error: err,
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

async function sendSMS(body, to_number) {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const my_phone_number = process.env.TWILIO_FROM_NUMBER;
    const client = twilio(accountSid, authToken);
    client.messages
      .create({
        to: `+91${to_number}`,
        from: my_phone_number,
        body: body,
      })
      .then((msg) => console.log(msg));
  } catch (err) {
    console.error("Error sending SMS:", err.message);
  }
}

export { getLinkDataAPI, getQRcode };

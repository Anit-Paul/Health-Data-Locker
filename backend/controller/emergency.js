import dotenv from "dotenv";
import DetailsModel from "../models/Details.js";
import RecordModel from "../models/Records.js";
dotenv.config();

function getLinkAPI(req, res) {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    const link = `${process.env.BASE_URL}/api/emergency/${user.id}`;

    return res.status(200).json({
      link: link,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from emergency getLinkAPI",
    });
  }
}

async function getLinkDataAPI(req, res) {
  try {
    const { token } = req.params;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const details = await DetailsModel.findOne({ userId: token });
    const record = await RecordModel.find({
      userId: token,
      uploadedAt: {
        $gte: sixMonthsAgo,
      },
    }).sort({uploadedAt:-1});
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
export { getLinkAPI, getLinkDataAPI };

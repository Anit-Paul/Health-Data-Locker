import { setRecord, getRecord } from "../service/token.js";
import RecordModel from "../models/Records.js";
function shareAPI(req, res) {
  try {
    const { recordId } = req.body;
    const token = setRecord(recordId);

    const link = `http://localhost:3000/api/share/${token}`;

    return res.status(200).json({
      message: "Share link created successfully",
      shareLink: link,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error from shareAPI",
      error: err,
    });
  }
}

async function fetchDataFromLinkAPI(req, res) {
  try {
    const { token } = req.params;
    const decoded = getRecord(token);
    if (!decoded) {
      return res.status(400).json({
        message: "Invalid token!",
      });
    }
    const record = await RecordModel.findById(decoded.recordID);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    return res.status(200).json({
      message: "Record fetched successfully",
      record,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error from fetchDataFromLinkAPI",
      error: err,
    });
  }
}

export { shareAPI, fetchDataFromLinkAPI };

import { getUser } from "../service/token.js";

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "token is missing",
      });
    }
    const user = getUser(token);
    if (!user) {
      return res.status(400).json({
        message: "No user found",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error from authMiddleware",
      error: err,
    });
  }
}
export default authMiddleware;

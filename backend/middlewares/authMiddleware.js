import { verifyAccessToken } from "../utils/jwtTokens.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      req.headers?.authorization?.split(" ")[1]?.trim();
    if (!token) {
      return res.status(401).json({ status: false, message: "Token required" });
    }
    //console.log("token", token);

    const decode = verifyAccessToken(token);
    if (!decode) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized access" });
    }
    req.userId = decode;
    //console.log("decode", decode);

    next();
  } catch (error) {
    return res
      .status(500)
      .json(
        { status: false, message: "Authentication failed", error },
        error.message
      );
  }
};

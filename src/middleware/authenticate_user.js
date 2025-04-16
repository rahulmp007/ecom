const { verifyAccessToken } = require("../utils/token_util");
const client = require("../prisma/prisma");
const AppError = require("../error/app_error");

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing or invalid" });
    }

    // Token verification
    const decoded = verifyAccessToken(token);
    console.log("Decoded token:", decoded);

    // Fetch user from DB
    const currentUser = await client.user.findFirst({
      where: { id: decoded.id },
    });

    if (!currentUser) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;

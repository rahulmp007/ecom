// refreshTokenController.js
const { verifyRefreshToken, generateAccessToken } = require('../utils/token_util');

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) return res.status(401).json({ message: "Missing token" });

  try {
    const payload = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({ id: payload.id });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

module.exports = { refreshAccessToken };

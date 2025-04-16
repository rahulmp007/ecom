const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.ACCESSTOKEN_SECRET,
    {
      expiresIn: "1m",
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.REFRESHTOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESSTOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESHTOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};

const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
  const result = jwt.verify(token, process.env.JWT_SECRET);
  console.log(result);
  return result;
};

module.exports = { generateToken, verifyToken };

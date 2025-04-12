const { verifyToken } = require("../utils/token_util");
const client = require("../prisma/prisma");
const AppError = require("../error/app_error");

const authenticateUser = async (req, res, next) => {

 
  
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);

  if (!token) {
    res.status(401).json({
      messge: "invalid token",
    });
    return;
  }

  const result = verifyToken(token);
  const currentUser = await client.user.findFirst({
    where: { id: result.id },
  });
  req.user = currentUser;
  next();
};

module.exports = authenticateUser;

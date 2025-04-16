const express = require("express");
const tokenController = require("../controller/token.controller");
const tokenRouter = express.Router();

tokenRouter.route("/refresh").get(tokenController.refreshAccessToken);

module.exports = tokenRouter;

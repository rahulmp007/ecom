const express = require("express");

const userRouter = express.Router();

const userController = require("../controller/user.controller");

userRouter.route("/").post(userController.createUser);

module.exports = userRouter;

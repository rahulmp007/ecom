const express = require("express");

const userRouter = express.Router();

const userController = require("../controller/user.controller");
const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");

userRouter
  .route("/")
  .get(authenticateUser, authorizeRoles("admin"), userController.getAllUsers)
  .post(userController.createUser)
  .put(authenticateUser, userController.updateUser)
  .delete(authenticateUser, userController.deleteAllUsers);

userRouter
  .route("/:userId")
  .get(
    authenticateUser,
    authorizeRoles(["admin", "user"]),
    userController.getUserById
  );
userRouter.route("/login").post(userController.login);

module.exports = userRouter;

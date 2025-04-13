const express = require("express");
const categoryController = require("../controller/category.controller");
const categoryRouter = express.Router();

const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");

categoryRouter
  .route("/")
  .get(
    authenticateUser,
    authorizeRoles(["admin"]),
    categoryController.getCategories
  )
  .post(
    authenticateUser,
    authorizeRoles(["admin"]),
    categoryController.createCategory
  )
  .put(
    authenticateUser,
    authorizeRoles(["admin"]),
    authenticateUser,
    categoryController.updateCategory
  )
  .delete(
    authenticateUser,
    authorizeRoles(["admin"]),
    categoryController.deleteCategory
  );

module.exports = categoryRouter;

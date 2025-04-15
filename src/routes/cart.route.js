const express = require("express");
const cartController = require("../controller/cart.controller");
const cartRouter = express.Router();

const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");
const validate = require("../middleware/validate");
const { addToCartSchema } = require("../utils/validation_schema");

cartRouter
  .route("/add")
  .post(
    authenticateUser,
    authorizeRoles(["customer"]),
    validate(addToCartSchema),
    cartController.addToCart
  );

cartRouter
  .route("/remove")
  .delete(
    authenticateUser,
    authorizeRoles(["customer"]),
    cartController.removeFromCart
  );
cartRouter
  .route("/")
  .get(
    authenticateUser,
    authorizeRoles(["customer"]),
    cartController.getUserCart
  );
cartRouter
  .route("/count")
  .get(
    authenticateUser,
    authorizeRoles(["customer"]),

    cartController.getCartItemCount
  );

module.exports = cartRouter;

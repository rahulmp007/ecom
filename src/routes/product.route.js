const express = require("express");
const productController = require("../controller/product.controller");
const productRouter = express.Router();

const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");
const { createProductSchema } = require("../utils/validation_schema");
const validate = require("../middleware/validate");

productRouter
  .route("/")
  .get(
    authenticateUser,
    authorizeRoles(["admin", "customer"]),
    productController.getProducts
  )
  .post(
    authenticateUser,
    authorizeRoles(["admin"]),
    validate(createProductSchema),
    productController.createProduct
  );

productRouter
  .route("/:productId")
  .get(
    authenticateUser,
    authorizeRoles(["admin", "customer"]),
    productController.getProductById
  )
  .put(
    authenticateUser,
    authorizeRoles(["admin"]),
    authenticateUser,
    productController.updateProduct
  )
  .delete(
    authenticateUser,
    authorizeRoles(["admin"]),
    productController.deleteProductById
  );

module.exports = productRouter;

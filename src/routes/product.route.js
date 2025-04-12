const express = require("express");
const productController = require("../controller/product.controller");
const productRouter = express.Router();

const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");

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
    productController.createProduct
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

productRouter
  .route("/:productId")
  .get(
    authenticateUser,
    authorizeRoles(["admin", "user"]),
    productController.getProductById
  );

module.exports = productRouter;

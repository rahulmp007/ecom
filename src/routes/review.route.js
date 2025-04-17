const express = require("express");
const reviewController = require("../controller/review.controller");
const reviewRouter = express.Router();

const authenticateUser = require("../middleware/authenticate_user");
const authorizeRoles = require("../middleware/authorize_roles");

reviewRouter
  .route("/")
  .post(
    authenticateUser,
    authorizeRoles(["admin", "customer"]),
    reviewController.addReview
  );

reviewRouter
  .route("/:reviewId")
 
  .post(
    authenticateUser,
    authorizeRoles(["customer"]),
    reviewController.updateReview
  );

reviewRouter
  .route("/:productId")
  .get(
    authenticateUser,
    authorizeRoles(["admin"]),
    reviewController.viewAllReviews
  );
module.exports = reviewRouter;

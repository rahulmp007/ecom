const reviewRepo = require("../repository/review.repository");

class ReviewController {
  constructor(parameters) {}

  async addReview(req, res, next) {
    try {
      const { userId, productId, description } = req.body;
      if (!userId || !productId || !description) {
        return res
          .status(400)
          .json({ message: "userId, productId, and description are required" });
      }

      const review = await reviewRepo.add({ userId, productId, description });
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }

  async updateReview(req, res, next) {
    try {
      const id = req.params.reviewId;
      const {description} = req.body;

      console.log(id, description);

      if (!description)
        return res.status(400).json({ message: "Description is required" });

      const updated = await reviewRepo.update(id, { description });
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteReview(req, res, next) {
    try {
      const { id } = req.params;
      if (isNaN(id))
        return res.status(400).json({ message: "Invalid review ID" });

      const result = await reviewRepo.deleteReview(id);
      res.status(200).json({ message: "Deleted successfully", result });
    } catch (error) {
      next(error);
    }
  }

  async viewAllReviews(req, res, next) {
    try {
      const { productId } = req.params;
      if (isNaN(productId))
        return res.status(400).json({ message: "Invalid product ID" });

      const reviews = await reviewRepo.getAllReviewByProductId(productId);
      res.status(200).json({ status: "success", data: reviews });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ReviewController();

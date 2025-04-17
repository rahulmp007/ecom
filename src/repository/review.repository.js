const prisma = require("../prisma/prisma");
const AppError = require("../error/app_error");

class ReviewRepository {
  constructor(parameters) {}

  async add(reviewInfo) {
    const { userId, productId, description } = reviewInfo;
    try {
      if (!description || description.trim() === "") {
        throw new AppError("Review description cannot be empty", 400);
      }

      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!user) throw new AppError("User does not exist", 404);

      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) throw new AppError("Product does not exist", 404);

      // Optional: Prevent duplicate reviews from the same user for the same product
      const existing = await prisma.review.findFirst({
        where: { userId: parseInt(userId), productId: parseInt(productId) },
      });
      if (existing) {
        throw new AppError("You have already reviewed this product", 409);
      }

      return await prisma.review.create({
        data: {
          description,
          user: { connect: { id: parseInt(userId) } },
          product: { connect: { id: parseInt(productId) } },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async update(reviewId, updateData) {
    console.log(updateData.description);

    try {
      const existing = await prisma.review.findUnique({
        where: { id: parseInt(reviewId) },
      });
      if (!existing) throw new AppError("Review not found", 404);

      if (updateData.description && updateData.description === "") {
        throw new AppError("Review description cannot be empty", 400);
      }

      return await prisma.review.update({
        where: { id: parseInt(reviewId) },
        data: {
          description: updateData.description ?? existing.description,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteReviewById(reviewId) {
    try {
      const review = await prisma.review.findUnique({
        where: { id: parseInt(id) },
      });
      if (!review) throw new AppError("Review not found", 404);

      return await prisma.review.delete({
        where: { id: parseInt(id) },
      });
    } catch (error) {
      throw error;
    }
  }

  async getAllReviewByProductId(productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });

      if (!product) {
        throw new AppError("Product not found", 404);
      }

      return await prisma.review.findMany({
        where: { productId: parseInt(productId) },
        include: {
          user: { select: { id: true, name: true } },
        },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ReviewRepository();

const AppError = require("../error/app_error");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token_util");

class ProductRepository {
  constructor() {}

  /**
   * Retrieves all products.
   * @returns {Promise<Array>} Array of product objects
   */
  async getAll() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Adds a new product and links it to a category.
   * If category doesn't exist, it will be created.
   * @param {Object} productInfo
   * @param {string} productInfo.name
   * @param {string} productInfo.description
   * @param {number} productInfo.price
   * @param {number} productInfo.stock
   * @param {string} productInfo.category
   * @returns {Promise<Object>} The created product
   */

  async addProduct(productInfo) {
    console.log(productInfo);

    const { name, description, price, stock, category } = productInfo;
    try {
      const existingCategory = await prisma.category.findUnique({
        where: {
          name: category,
        },
      });
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
          category: {
            connectOrCreate: {
              where: { name: existingCategory.name },
              create: { name: existingCategory.name },
            },
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Edits a product's information.
   * @param {Object} productInfo
   * @param {number} productInfo.pId - Product ID
   * @param {string} [productInfo.name]
   * @param {string} [productInfo.description]
   * @param {number} [productInfo.price]
   * @param {number} [productInfo.stock]
   * @param {number} [productInfo.categoryId]
   * @returns {Promise<Object>} Updated product object
   */
  async editProduct(productInfo) {
    try {
      const { name, description, price, stock, categoryId, pId } = productInfo;

      const product = await prisma.product.findUnique({
        where: { id: parseInt(pId) },
      });
      if (!product) {
        throw new AppError("product not found", 404);
      }

      const updateInfo = {};

      if (name !== undefined) updateInfo.name = name;
      if (description !== undefined) updateInfo.description = description;
      if (price !== undefined) updateInfo.price = price;
      if (stock !== undefined) updateInfo.stock = stock;

      if (categoryId !== undefined) {
        updateInfo.category = {
          connect: { id: categoryId },
        };
      }

      const updated = await prisma.product.update({
        where: {
          id: parseInt(pId),
        },
        data: updateInfo,
      });
      return updated;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Fetches a product by its ID.
   * @param {number} productId - The product ID
   * @returns {Promise<Object>} Product object
   * @throws {AppError} If product not found
   */
  async fetchProductById(productId) {
    try {
      const product = prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) {
        throw new AppError("product not found", 404);
      }
      return product;
    } catch (error) {
      next(error);
    }
  }

  /**
   * Deletes a product by its ID.
   * @param {number} productId - Product ID to delete
   * @returns {Promise<void>}
   * @throws {AppError} If product not found
   */
  async deleteProductById(productId) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: {
          category: true,
        },
      });

      console.log(product);

      if (!product) {
        throw new AppError("product not found", 404);
      }
      await prisma.product.delete({
        where: { id: parseInt(productId) },
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ProductRepository();

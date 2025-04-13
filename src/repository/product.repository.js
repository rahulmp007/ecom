const AppError = require("../error/app_error");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token_util");

class ProductRepository {
  constructor() {}

  async getAll() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      next(error);
    }
  }

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

  async editProduct(productInfo) {
    try {
      const product = prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) {
        throw new AppError("product not found", 404);
      }
      const { name, description, price, stock, categoryId, pId } = productInfo;

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

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
    
    const { name, description, price, stock } = productInfo;
    try {
     const product =  await prisma.product.create({
        data: {
          name,
          description,
          price,
          stock,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async editProduct() {
    try {
    } catch (error) {
      next(error);
    }
  }

  async fetchProductById() {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById() {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductRepository();

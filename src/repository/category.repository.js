const AppError = require("../error/app_error");
const client = require("../prisma/prisma");

client;
class CategoryRepository {
  constructor(parameters) {}

  async getCategories() {
    try {
      return await client.category.findMany();
    } catch (error) {
      throw error;
    }
  }

  async createCategory(category) {
    try {
      const existingCategory = await client.category.findUnique({
        where: {
          name: category,
        },
      });

      if (existingCategory) {
        throw new AppError("Category already exists", 409);
      }

      const result = await client.category.create({
        data: {
          name: category,
        },
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryInfo) {
    try {
    } catch (error) {
      throw error;
    }
  }

  async deleteAllCategory() {
    try {
      return await client.category.deleteMany();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryRepository();

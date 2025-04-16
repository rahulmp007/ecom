const AppError = require("../error/app_error");
const client = require("../prisma/prisma");

client;
class CategoryRepository {
  constructor(parameters) {}



  /**
   * Get all categories from the database.
   * @returns {Promise<Array>} Array of category objects
   */
  async getCategories() {
    try {
      return await client.category.findMany();
    } catch (error) {
      throw error;
    }
  }


  /**
   * Creates a new category if it doesn't already exist.
   * @param {string} category - Name of the category to create
   * @returns {Promise<Object>} The created category object
   * @throws {AppError} If category already exists
   */
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


  /**
   * Updates the name of a category.
   * @param {Object} categoryInfo
   * @param {number} categoryInfo.id - Category ID
   * @param {string} categoryInfo.name - New name of the category
   * @returns {Promise<Object>} The updated category object
   * @throws {AppError} If category not found
   */
  async updateCategory(categoryInfo) {
    try {
    } catch (error) {
      throw error;
    }
  }


  /**
   * Deletes all categories from the database.
   * @returns {Promise<Object>} Result of the deleteMany operation
   */
    async deleteAllCategory() {
    try {
      return await client.category.deleteMany();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryRepository();

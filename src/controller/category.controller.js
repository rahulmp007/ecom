const categoryRepository = require("../repository/category.repository");
class CategoryController {
  constructor(parameters) {}

  async getCategories(req, res, next) {
    try {
      const categories = await categoryRepository.getCategories();
      res.status(200).json({ status: "success", data: categories });
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    const { name } = req.body;
    try {
      const category = await categoryRepository.createCategory(name);

      if (category) {
        return res
          .status(200)
          .json({ status: "success", message: "category added" });
      }

      res.status(200).json({ data: category });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteCategory(req, res, next) {
    try {
      await categoryRepository.deleteAllCategory();
      res.status(200).json({ message: "category list deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();

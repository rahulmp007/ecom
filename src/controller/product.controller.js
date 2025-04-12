const productRepository = require("../repository/product.repository");

class ProductController {
  constructor() {}

  async getProducts(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    
    
    try {
      await productRepository.addProduct(req.body);
      res.status(200).json({ status: "success", message: "product created" });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();

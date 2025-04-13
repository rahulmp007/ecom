const productRepository = require("../repository/product.repository");

class ProductController {
  constructor() {}

  async getProducts(req, res, next) {
    try {
      const products = await productRepository.getAll();
      res.status(200).json({ status: "success", data: products });
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
      const pId = req.params.productId;

      await productRepository.editProduct({ ...req.body, pId });
      res.status(200).json({ status: "success", message: "product updated" });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const pId = req.params.productId;
      const product = await productRepository.fetchProductById(pId);
      res.status(200).json({ status: "success", data: product });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      const pId = req.params.productId;
      const product = await productRepository.deleteProductById(pId);
      res.status(200).json({ status: "success", message: "product deleted" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();

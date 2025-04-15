const cartRepository = require("../repository/cart.repository");

class CartController {
  constructor(parameters) {}

  async addToCart(req, res, next) {
    try {
      await cartRepository.add(req.body);
      res
        .status(200)
        .json({ status: "successs", message: "item added to cart" });
    } catch (error) {
      next(error);
    }
  }

  async removeFromCart(req, res, next) {
    try {
      await cartRepository.remove(req.body);
      res
        .status(200)
        .json({ status: "successs", message: "item removed from cart" });
    } catch (error) {
      next(error);
    }
  }

  async updateCartItem(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getUserCart(req, res, next) {
    try {
      const userId = req.user.id;
      const cart = await cartRepository.getCart(userId);
      res.status(200).json({ status: "success", data: cart });
    } catch (error) {
      next(error);
    }
  }

  async getCartItemCount(req, res, next) {
    try {
      const userId = req.user.id;
      const cartItemCount = await cartRepository.getCartItemCount(userId);
      res.status(200).json({ status: "success", count: cartItemCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();

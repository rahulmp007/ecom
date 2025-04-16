const AppError = require("../error/app_error");
const client = require("../prisma/prisma");

class CartRepository {
  constructor(parameters) {}

  /**
   * Add a product to a user's cart. If the cart or item doesn't exist, it creates them.
   * If the item exists, it updates the quantity.
   *
   * @param {Object} cartInfo
   * @param {number|string} cartInfo.userId - User ID
   * @param {number|string} cartInfo.productId - Product ID
   * @param {number|string} cartInfo.quantity - Quantity to add
   * @throws {AppError} If input is invalid or product not found
   */
  async add(cartInfo) {
    try {
      const { userId, productId, quantity } = cartInfo;

      const pid = parseInt(productId);
      const uid = parseInt(userId);
      const qty = parseInt(quantity);

      if (isNaN(pid) || isNaN(uid) || isNaN(qty) || qty < 1) {
        throw new AppError("Invalid input", 400);
      }

      const product = await client.product.findFirst({
        where: { id: pid },
      });

      if (!product) {
        throw new AppError("No such product exists", 404);
      }

      let currentUserCart = await client.cart.findUnique({
        where: { userId: uid },
        include: { items: true },
      });

      if (!currentUserCart) {
        currentUserCart = await client.cart.create({
          data: { userId: uid },
        });
      }

      const existingItem = await client.cartItem.findFirst({
        where: {
          cartId: currentUserCart.id,
          productId: pid,
        },
      });

      if (existingItem) {
        await client.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + qty,
          },
        });
        console.log("Quantity updated");
      } else {
        await client.cartItem.create({
          data: {
            cartId: currentUserCart.id,
            productId: pid,
            quantity: qty,
          },
        });
        console.log("Item created");
      }
    } catch (error) {
      throw error;
    }
  }


  /**
   * Removes a product from the user's cart.
   *
   * @param {Object} cartInfo
   * @param {number|string} cartInfo.userId - User ID
   * @param {number|string} cartInfo.productId - Product ID
   * @throws {AppError} If product or item not found
   */
  async remove(cartInfo) {
    try {
      const { userId, productId } = cartInfo;

      const pid = parseInt(productId);
      const uid = parseInt(userId);
      if (isNaN(pid) || isNaN(uid)) {
        throw new AppError("Invalid input", 400);
      }

      const product = await client.product.findFirst({
        where: { id: pid },
      });

      if (!product) {
        throw new AppError("No such product exists", 404);
      }

      let userCart = await client.cart.findUnique({
        where: { id: parseInt(uid) },
      });

      if (!userCart) {
        throw new AppError("cart not found", 404);
      }

      let cartItem = await client.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: parseInt(userCart.id),
            productId: parseInt(pid),
          },
        },
      });

      if (!cartItem) {
        throw new AppError("item not found", 404);
      }

      await client.cartItem.delete({
        where: {
          cartId_productId: {
            cartId: parseInt(userCart.id),

            productId: parseInt(pid),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }


   /**
   * Get the count of distinct cart items for a user.
   *
   * @param {number|string} userId - User ID
   * @returns {Promise<number>} Number of distinct products in the cart
   * @throws {AppError} If cart not found
   */
  async getCartItemCount(userId) {
    try {
      const userCart = await client.cart.findUnique({
        where: { userId: parseInt(userId) },
        include: { items: true },
      });
      if (!userCart) {
        throw new AppError("no cart found for this user");
      }
      const totalItems = await client.cartItem.aggregate({
        _count: { productId: true },
        where: {
          cartId: parseInt(userCart.id),
        },
      });

      return totalItems._count.productId;
      return userCart;
    } catch (error) {
      throw error;
    }
  }


   /**
   * Get the full cart for a user, including all items.
   *
   * @param {number|string} userId - User ID
   * @returns {Promise<Object>} Cart with items
   * @throws {AppError} If cart not found
   */
  async getCart(userId) {
    try {
      const userCart = await client.cart.findUnique({
        where: { userId: parseInt(userId) },
        include: { items: true },
      });
      if (!userCart) {
        throw new AppError("no cart found for this user");
      }
      return userCart;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CartRepository();

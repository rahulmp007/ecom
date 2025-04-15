const AppError = require("../error/app_error");
const client = require("../prisma/prisma");

class CartRepository {
  constructor(parameters) {}

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

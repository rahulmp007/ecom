const AppError = require("../error/app_error");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token_util");

class UserRepository {
  constructor() {}

  /**
   * Adds a new user with address.
   * @param {Object} userInfo
   * @returns {Promise<Object>} Created user (excluding password)
   */
  async addUser(userInfo) {
    const { name, email, password, role, city, street, pin } = userInfo;

    try {
      const isUserExists = await prisma.user.findUnique({ where: { email } });

      if (isUserExists) {
        throw new AppError("User already exists", 409);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          addresses: {
            create: [{ street, city, pin }],
          },
        },
        include: { addresses: true },
      });

      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Authenticates user and returns tokens.
   * @param {Object} userInfo
   * @returns {Promise<Object>} Authenticated user + tokens
   */
  async loginUser(userInfo) {
    const { email, password } = userInfo;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) throw new AppError("User not found", 404);

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new AppError("Invalid password", 401);

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      delete user.password;
      return { ...user, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Updates user info and address by email.
   * @param {Object} userInfo
   * @returns {Promise<Object>} Updated user
   */
  async updateUser(userInfo) {
    const { email, name, role, street, city, pin } = userInfo;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { addresses: true },
      });

      if (!user) throw new AppError("User not found", 404);
      const addr = user.addresses[0];

      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          role,
          addresses: {
            update: [
              {
                where: { id: addr.id },
                data: { city, street, pin },
              },
            ],
          },
        },
        include: { addresses: true },
      });

      delete updatedUser.password;
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes all users. (No limit in deleteMany)
   * @returns {Promise<Object>} Delete result
   */
  async deleteAllUsers() {
    try {
      const result = await prisma.user.deleteMany(); // No limit supported
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Finds all users with addresses.
   * @returns {Promise<Array>} Array of users
   */
  async findAll() {
    try {
      return await prisma.user.findMany({
        include: { addresses: true },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Finds a user by ID.
   * @param {number} id - User ID
   * @returns {Promise<Object>} User with address
   */
  async findUserById(id) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { addresses: true },
      });

      if (!user) throw new AppError("User not found", 404);
      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserRepository();

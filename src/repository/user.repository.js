const AppError = require("../error/app_error");
const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/token_util");
class UserRepository {
  constructor(parameters) {}

  async addUser(userInfo) {
    const { name, email, password, role, city, street, pin } = userInfo;

    try {
      const isUserExists = await prisma.user.findUnique({ where: { email } });
      console.log(` user : `, isUserExists);

      if (isUserExists) {
        throw new AppError("user already exists", 409);
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role,
          addresses: { create: [{ street, city, pin }] },
        },
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async loginUser(userInfo) {
    try {
      const { email, password } = userInfo;
      const user = await prisma.user.findUnique({
        where: { email },
        // select: { id: true, name: true, email: true },
      });

      if (!user) {
        throw new AppError("user not found", 404);
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new AppError("invalid password", 401);
      }

      const token = generateToken(user);

      delete user.password;

      return { ...user, token: token };
    } catch (error) {
      throw error;
    } finally {
      prisma.$disconnect();
    }
  }

  async updateUser(userInfo) {
    const { email, name, role, street, city, pin } = userInfo;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { addresses: true },
      });
      const addr = user.addresses[0];

      if (!user) {
        throw new AppError("user not found", 404);
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          role,
          addresses: {
            update: [
              {
                where: { id: addr.id },
                data: {
                  city,
                  street,
                  pin,
                },
              },
            ],
          },
        },
      });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async delete() {
    try {
      const count = await prisma.user.deleteMany({ limit: 10 });
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findAll() {
    console.log("find all");
    try {
      const users = await prisma.user.findMany({
        include: { addresses: true },
      });
      return users;
    } catch (error) {
      throw error;
    } finally {
      await prisma.$disconnect();
    }
  }

  async findUserById(id) {
    try {
      return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { addresses: true },
      });
    } catch (error) {
      throw error;
    } finally {
      prisma.$disconnect();
    }
  }
}

module.exports = new UserRepository();

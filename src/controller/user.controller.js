const userRepo = require("../repository/user.repository");

class UserController {
  constructor(parameters) {}

  async getAllUsers(req, res, next) {
    console.log(`get all users`);

    try {
      const users = await userRepo.findAll();
      res.status(200).json({ status: "success", data: users });
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      await userRepo.addUser({
        name,
        email,
        password,
        role,
      });
      res.status(200).json({ status: "success", message: "user created" });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await userRepo.loginUser(req.body);
      res.status(200).json({ message: "login successfull", user: user });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const user = await userRepo.updateUser(req.body);
      res.status(200).json({ message: "login successfull", user: user });
    } catch (error) {
      next(error);
    }
  }

  async deleteAllUsers(req, res, next) {
    try {
      const user = await userRepo.delete();
      res.status(200).json({ message: "user db cleared", user: user });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userRepo.findUserById(req.params.userId);
      console.log(`user`,user);
      
      if (!user) {
        return res.status(200).json({ message: "user not exists" });
      }
      res.status(200).json({ status: "success", user: user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

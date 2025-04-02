const userRepo = require("../repository/user.repository");

class UserController {
  constructor(parameters) {}

  async createUser(req, res, next) {
    try {
      const { name, email, password } = req.body;
      await userRepo.addUser({
        name,
        email,
        password,
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
}

module.exports = new UserController();

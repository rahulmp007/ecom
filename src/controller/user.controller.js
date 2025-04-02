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
    } catch (error) {}
  }
}

module.exports = new UserController();

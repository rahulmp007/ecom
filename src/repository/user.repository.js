const prisma = require("../prisma/prisma");
const bcrypt = require("bcryptjs");
class UserRepository {
  constructor(parameters) {}

  async addUser(userInfo) {
    console.log("creating user");

    const { name, email, password } = userInfo;
    console.log(name,email,password);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await prisma.users.create({
        data: { name, email, password: hashedPassword },
      });
      console.log(`user created : ${user}`);
    } catch (error) {
      console.log(error);
    } finally {
        console.log(`finally`);
        
      await prisma.$disconnect();
    }
  }
}

module.exports = new UserRepository();

const pg = require("pg");

require("dotenv").config({ path: "./src/.env" });

const pool = new pg.Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log(
      `database connection successfull on port ${process.env.DB_PORT}`
    );
  } catch (error) {
    console.error(`database connection exit with error : ${error}`);
  }
};

module.exports = connectDb;

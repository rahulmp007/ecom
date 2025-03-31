const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./src/.env" });

const connectDb = require("./database/db");

const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(port, () =>
      console.log(`server running on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log(`failed to establish server connection!`);
  });

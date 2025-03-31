const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "./src/.env" });

const port = process.env.PORT || 8000;

app.listen(port, () =>
  console.log(`server running on http://localhost:${port}`)
);

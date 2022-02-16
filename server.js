const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "/QUESTRONIX NODEJS EXAM/config/config.env" });

const db = require("./config/database");

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`
  );
});

const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const port = process.env.PORT;

//database connect
database.connect();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});

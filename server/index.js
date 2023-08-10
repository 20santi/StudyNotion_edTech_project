const express = require("express");
const app = express();
const database = require("./config/database");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");

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

app.use("/api/v2/auth", userRoutes);

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and routing"
  })
})

app.listen(port, () => {
  console.log(`App is listening at ${port}`);
});

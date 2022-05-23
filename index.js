require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const { verifyToken } = require("./middleware/auth");

const app = express();
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;
const host = process.env.HOST || "localhost";

app.use(express.json());

app.use("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome to the API");
});

app.use("/api/", require("./routes/auth"));

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});

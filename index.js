const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 6000;
require("dotenv").config();
const CryptoJS = require("crypto-js");
const User = require("./src/user");

app.use(express.json());
// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("db connected");
} catch (err) {
  console.log(err);
}

// Register API
app.post("/register", async (req, res) => {
  const password = req.body.password;

  try {
    // secret password
    req.body.password = CryptoJS.AES.encrypt(
      "password",
      process.env.SECRET_KEY
    );
    // new user
    const user = await User.create(req.body);
  } catch {}
});

app.listen(PORT, () => {
  console.log("local server is running");
});

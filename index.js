const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 6000;
require("dotenv").config();

// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("db connected");
} catch (err) {
  console.log(err);
}

app.listen(PORT, () => {
  console.log("local server is running");
});

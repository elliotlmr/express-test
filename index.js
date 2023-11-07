const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = 3001;
require("dotenv").config();

// Solve cors error
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  })
);

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes"));
// -> localhost:3300/api/v1/register

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

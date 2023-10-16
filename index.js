const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3300;
require("dotenv").config();
const CryptoJS = require("crypto-js");
const User = require("./src/user");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

app.use(express.json());
// Connect to MongoDB
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("db connected");
} catch (err) {
  console.log(err);
}

// Register API
app.post(
  "/register",
  //   Validation check before register a new user
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username needs more than 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password needs more than 8 characters"),
  body("confirmPassword")
    .isLength({ min: 8 })
    .withMessage("Confirm password needs more than 8 characters"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("A user already exists.");
      }
    });
    // const user = await UserCollection.findUserById(value);
    // if(user){
    //     throw new Error('A user already exists')
    // }
  }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Middle wear の時に必要なNext
    next();
  },
  async (req, res) => {
    const password = req.body.password;
    try {
      // Secret Password
      req.body.password = CryptoJS.AES.encrypt(
        "password",
        process.env.SECRET_KEY
      );

      // New User
      const user = await User.create(req.body);

      // Jason Web Token
      const token = jwt.sign(
        {
          // --(何の)：（何をもとに発行するのか）
          id: user._id,
        },
        "process.env.JWT_SECRET_KEY",
        { expiresIn: "24h" }
      );

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

app.listen(PORT, () => {
  console.log("local server is running");
});

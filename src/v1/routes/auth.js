require("dotenv").config();
const { body } = require("express-validator");
const router = require("express").Router();

const User = require("../modules/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandler = require("../handlers/tokenHandler");
// const userLogin = require("../controllers/login");

// Register API
router.post(
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
        return Promise.reject("User already exists.");
      }
    });
  }),
  validation.validate,
  userController.register
);

// Login API
router.post(
  "/login",
  body("username")
    .isLength({ min: 8 })
    .withMessage("Username needs more than 8 characters"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password needs more than 8 characters"),
  validation.validate,
  userController.login
);

// JWT Verify API
router.post("/", tokenHandler.verifyToken, (req, res) => {
  return res.status(200).json({ user: req.user });
});
module.exports = router;

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../modules/user");

exports.register = async (req, res) => {
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
};

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../modules/user");

exports.register = async (req, res) => {
  const password = req.body.password;
  try {
    // Secret Password
    req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

    // New User
    const user = await User.create(req.body);

    // Jason Web Token
    const token = jwt.sign(
      {
        // --(何の)：（何をもとに発行するのか）
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// exports/login の真似してアカウトが存在する時のエラーをかけるかも？

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({
        errors: [
          {
            param: "username",
            msg: "Wrong username",
          },
        ],
      });
    }
    // Verify password
    const decryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptoJS.enc.Utf8);

    // console.log("test", decryptedPassword, user.password);

    // decrypted.toString(CryptoJS.enc.Utf8)
    // -> CryptoJS ライブラリを使用し復号化されたデータを
    // UTF-8 エンコーディングの文字列に変換するJavaScriptコード
    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [
          {
            param: "password",
            msg: "Wrong password",
          },
        ],
      });
    }
    // JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    return res.status(201).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};

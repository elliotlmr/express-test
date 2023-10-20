// const User = require("../modules/user");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");

// exports.login = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username: username });
//     if (!user) {
//       return res.status(401).json({
//         param: "username",
//         message: "Wrong username",
//       });
//     }
//     // Verify password
//     const decryptedPassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.SECRET_KEY
//     ).toString(CryptoJS.enc.Utf8);
//     // decrypted.toString(CryptoJS.enc.Utf8)
//     // -> CryptoJS ライブラリを使用し復号化されたデータを
//     // UTF-8 エンコーディングの文字列に変換するJavaScriptコード
//     if (decryptedPassword !== password) {
//       return res.status(401).json({
//         param: "password",
//         message: "Wrong password",
//       });
//     }
//     // JWT
//     const token = jwt.sign(
//       {
//         id: user._id,
//       },
//       "process.env.JWT_SECRET_KEY",
//       { expiresIn: "24h" }
//     );
//     return res.status(201).json({ user, token });
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

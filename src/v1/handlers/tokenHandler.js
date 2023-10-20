const jwt = require("jsonwebtoken");
const User = require("../modules/user");

// Check JWT
const tokenDecode = (req) => {
  // bearerHeader -> "authorization": bearer_token ->Tokenが欲しい
  // Split構文で配列にしてbearer(0) _ Token(1)と見なして取り出す
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ")[1];
    console.log("test1", bearerHeader);
    try {
      console.log("test2", bearer);
      const tokenDecoded = jwt.verify(bearer, process.env.JWT_SECRET_KEY);
      // bearer = jwt envの鍵でJWTをdecodeする

      //   ??? この辺に問題あり？Authorizeできない
      return tokenDecoded;
      console.log("test3", tokenDecoded);
    } catch {
      return false;
    }
  } else {
    return false;
  }
};

// Middle wear to verify JWT
exports.verifyToken = async (req, res, next) => {
  const tokenDecoded = tokenDecode(req);
  console.log(tokenDecoded);
  if (tokenDecoded) {
    // JWTが一致するUserを探したい
    const user = await User.findById(tokenDecoded.id);
    if (!user) {
      return res.status(401).json("No authorization 1");
    }
    req.user = user;
    next();
  } else {
    return res.status(401).json("No authorization 2");
  }
};

const router = require("express").Router();
// const Memo = require("../modules/memo");
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

router.post("/", tokenHandler.verifyToken, memoController.create);

module.exports = router;

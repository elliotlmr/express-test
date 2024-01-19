const router = require("express").Router();
// const Memo = require("../modules/memo");
const memoController = require("../controllers/memo");
const tokenHandler = require("../handlers/tokenHandler");

router.post("/", tokenHandler.verifyToken, memoController.create);
router.get("/", tokenHandler.verifyToken, memoController.getAll);
router.put("/", tokenHandler.verifyToken, memoController.updatePosition);
router.get("/favorites", tokenHandler.verifyToken, memoController.getFavorites);
router.get("/:memoId", tokenHandler.verifyToken, memoController.getOne);
router.put("/:memoId", tokenHandler.verifyToken, memoController.update);
router.delete("/:memoId", tokenHandler.verifyToken, memoController.delete);

module.exports = router;

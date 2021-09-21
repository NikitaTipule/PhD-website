const express = require("express");
const {
  getPhdCordInfo,
  addPhdCord,
  removePhdCord,
} = require("../controllers/phdCord");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/:cordId", auth, getPhdCordInfo);

router.post("/add", auth, addPhdCord);

router.delete("/remove/:cordId", auth, removePhdCord);

module.exports = router;

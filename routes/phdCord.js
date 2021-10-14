const express = require("express");
const {
  getPhdCordInfo,
  addPhdCord,
  removePhdCord,
  getAllCords,
} = require("../controllers/phdCord");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/:cordId", auth, getPhdCordInfo);

router.get("/", auth, getAllCords);

router.post("/add", auth, addPhdCord);

router.post("/remove", auth, removePhdCord);

module.exports = router;

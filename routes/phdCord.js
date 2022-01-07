const express = require("express");
const {
  getPhdCordInfo,
  addPhdCord,
  removePhdCord,
  getAllCords,
  addLink,
  removeLink,
  getAllLinks,
} = require("../controllers/phdCord");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/:cordId", auth, getPhdCordInfo);

router.get("/", auth, getAllCords);

router.post("/add", auth, addPhdCord);

router.post("/remove", auth, removePhdCord);

router.get("/getalllinks", getAllLinks);
router.post("/addlink", auth, addLink);
router.post("/removelink/:linkid", auth, removeLink);

module.exports = router;

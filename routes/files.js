const { auth } = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const {
  uploadFile,
  getFileGrid,
  removeFileGrid,
} = require("../controllers/file");

router.post("/upload", [auth, uploadFile]);

router.get("/get/:filename", [auth, getFileGrid]);

router.delete("/delete/:filename", [auth, removeFileGrid]);

module.exports = router;

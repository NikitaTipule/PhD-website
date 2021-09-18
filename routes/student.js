const express = require("express");
const { loginStudent, registerStudent } = require("../controllers/auth");

const {
  uploadFileGrid,
  getFileGrid,
  removeFileGrid,
} = require("../controllers/file");

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.post("/uploadFile", uploadFileGrid.single("file"), (req, res) => {
  return res.json({ success: true });
});

router.get("/getFile/:filename", getFileGrid);

router.delete("/removeFile/:filename", removeFileGrid);

module.exports = router;

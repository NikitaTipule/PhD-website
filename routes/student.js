const express = require("express");
const { loginStudent, registerStudent } = require("../controllers/auth");

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);

module.exports = router;

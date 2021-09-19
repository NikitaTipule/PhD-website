const express = require("express");
const { loginAdmin } = require("../controllers/auth");
const router = express.Router();

router.post("/login", loginAdmin);
module.exports = router;

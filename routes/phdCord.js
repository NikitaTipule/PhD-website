const express = require("express");
const { loginPhdCord } = require("../controllers/auth");
const router = express.Router();

router.post("/login", loginPhdCord);
module.exports = router;

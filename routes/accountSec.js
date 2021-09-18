const express = require("express");
const { loginAccountSec } = require("../controllers/auth");
const router = express.Router();

router.post("/login", loginAccountSec);
module.exports = router;

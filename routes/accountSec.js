const { auth } = require("../middleware/auth");
const { loginAccountSec } = require("../controllers/auth");
const AccountSec = require("../models/accountSec");
const express = require("express");

const router = express.Router();

const addAccountSec = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can add phdCord" });
  }
  const { name, email } = req.body;
  if (!(name && email)) {
    res.status(400).json({ error: "missing data" });
  }
  AccountSec.findOne({ email }).then((oldUser) => {
    if (oldUser) {
      return res
        .status(409)
        .json({ error: "User Already Exist. Please ask to Login" });
    }
    const user = new AccountSec({ name, email });
    user
      .save()
      .then((user) => {
        // handle login for email with a link to password here
        res.json({ email });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err: "invalid data" });
      });
  });
};

const removeAccountSec = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can remove phdCord" });
  }
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: "missing paramters" });
  }
  AccountSec.deleteOne(email, (err, doc) => {
    if (err || !doc || doc.deletedCount == 0) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json({ success: "true" });
  });
};

router.post("/login", loginAccountSec);
router.post("/add", auth, addAccountSec);
router.post("/remove", auth, removeAccountSec);

module.exports = router;

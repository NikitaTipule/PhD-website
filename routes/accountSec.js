const { auth } = require("../middleware/auth");
const { loginAccountSec } = require("../controllers/auth");
const AccountSec = require("../models/accountSec");
const express = require("express");
const sendEmail = require("../controllers/email");

const router = express.Router();

const addAccountSec = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can add phdCord" });
  }
  const { name, email } = req.body;
  if (!(name && email)) {
    res.status(400).json({ error: "missing data" });
  }
  // console.log(name, email);
  AccountSec.findOne({ email }).then((oldUser) => {
    if (oldUser) {
      return res
        .status(409)
        .json({ error: "User Already Exist. Please ask to Login" });
    }
    const user = new AccountSec({
      name,
      email,
      password: Math.random().toString(36).slice(2, 8),
    });
    user
      .save()
      .then((user) => {
        sendEmail(
          email,
          `Your password for Phd website portal with email ${email} is ${user.password}.
           Please reset after signing in`,
          "PhD Website Account Section details"
        );
        res.send({
          userId: user._id,
          message: "An Email sent to user with the password",
        });
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
  AccountSec.deleteOne({ email: email }, (err, doc) => {
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

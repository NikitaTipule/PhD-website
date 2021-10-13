// Functionality common to staff users (non-Student users)

const AccountSec = require("../models/accountSec");
const roleToModel = require("./roles");

exports.myProfileStaff = (req, res) => {
  if (!req.userId) res.status(400).json({ error: "id is required" });
  const User = roleToModel[req.userRole];
  User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    res.json({ user });
  });
};

exports.removeStaff = (req, res) => {
  if (req.userRole != "admin") {
    return res.status(403).json({ error: "only admin can remove staff" });
  }
  const mis = req.params && req.params.mis;
  const role = req.params && req.params.role;
  if (!(mis && role))
    return res.status(400).json({ error: "All input is required" });
  User = roleToModel[role];
  User.deleteOne({ mis }, (err, doc) => {
    if (err || !doc || doc.deletedCount == 0)
      return res.status(404).json({ error: "user not found" });
    return res.json({ success: "true" });
  });
};

exports.addAccountSec = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can add account Section" });
  }
  const { name, mis, email } = req.body;
  if (!(name && mis && email)) {
    res.status(400).json({ error: "missing data" });
  }
  const user = new AccountSec({ name, mis, email });
  user
    .save()
    .then((user) => res.json(user))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: "invalid data" });
    });
};

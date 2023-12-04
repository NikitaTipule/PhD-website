// Functionality common to staff users (non-Student users)

const { loginStaff, registerAdmin } = require("../controllers/auth");
// const { loginFaculty } = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const express = require("express");
const roleToModel = require("../controllers/roles");

const router = express.Router();

const myProfileStaff = (req, res) => {
  if (!req.userId) res.status(400).json({ error: "id is required" });
  const User = roleToModel[req.userRole];
  User.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    res.json({ user });
  });
};

router.post("/login", loginStaff);
// router.post("/login", loginFaculty);

router.get("/me", [auth, myProfileStaff]);

router.get("/getuser", auth, (req, res) => {
  return res.status(200).json({ userId: req.userId, userRole: req.userRole });
});

router.post("/register", registerAdmin)

module.exports = router;

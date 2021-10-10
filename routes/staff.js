// routes common to nonStudent users
const { loginStaff } = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const { myProfileStaff, removeStaff } = require("../controllers/staff");
const express = require("express");
const router = express.Router();

router.post("/login", loginStaff);

router.get("/me", [auth, myProfileStaff]);

router.get("/getuser", auth, (req, res) => {
  return res.status(200).json({ userId: req.userId, userRole: req.userRole });
});
router.delete("/remove/:role/:mis", auth, removeStaff);
module.exports = router;

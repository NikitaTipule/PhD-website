const express = require("express");
const {
  loginStudent,
  registerStudent,
  verifyMail,
} = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const {
  myProfileStudent,
  getStudentInfo,
  getStudentsByDept,
  editStudentDocs,
  editStudentFeeDetails,
  editStudentInfo,
  verifyFeeDetails,
  verifyStudent,
} = require("../controllers/student");

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.get("/verifymail/:userId/:token", verifyMail);

router.get("/me", [auth, myProfileStudent]);
router.get("/:userId", [auth, getStudentInfo]);
router.get("/department/:department", [auth, getStudentsByDept]);

router.post("/edit/docs", auth, editStudentDocs);
router.post("/edit/fee", auth, editStudentFeeDetails);
router.post("/edit/info", auth, editStudentInfo);

router.post("/verify/fee", auth, verifyFeeDetails);
router.post("/verify", auth, verifyStudent);

module.exports = router;

const express = require("express");
const { loginStudent, registerStudent } = require("../controllers/auth");
const { auth } = require("../middleware/auth");
const {
  myProfileStudent,
  getStudentInfo,
  getStudentsByDept,
  editStudentDocs,
  editStudentFeeDetails,
  editStudentInfo,
} = require("../controllers/student");

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);

router.get("/me", [auth, myProfileStudent]);
router.get("/:userId", [auth, getStudentInfo]);
router.get("/department/:department", [auth, getStudentsByDept]);

router.post("/edit/docs", editStudentDocs);
router.post("/edit/fee", editStudentFeeDetails);
router.post("/edit/info", editStudentInfo);

module.exports = router;

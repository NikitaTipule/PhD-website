const express = require("express");
const {
  loginStudent,
  registerStudent,
  verifyMail,
  verifyMobile,
  sendOtp,
  requestPasswordReset,
  passwordReset,
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
  verifyStudentInfo,
  lockProfile,
  getPartialApplications,
} = require("../controllers/student");

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.post("/verifymail", verifyMail);
router.post("/resendotp", sendOtp);
router.post("/request-password-reset", requestPasswordReset);
router.post("/password-reset", passwordReset);

router.get("/me", [auth, myProfileStudent]);
router.get("/:userId", [auth, getStudentInfo]);
router.get("/department/:department", [auth, getStudentsByDept]);
router.get("/partialApplications/:department", [auth, getPartialApplications]);

router.post("/edit/docs", auth, editStudentDocs);
router.post("/edit/fee", auth, editStudentFeeDetails);
router.post("/edit/info", auth, editStudentInfo);

router.post("/verify/fee", auth, verifyFeeDetails);
router.post("/verify/info", auth, verifyStudentInfo);

router.post("/lock", auth, lockProfile);

module.exports = router;

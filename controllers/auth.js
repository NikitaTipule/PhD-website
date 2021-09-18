const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const {
  studentKey,
  cordKey,
  adminKey,
  accountSectionKey,
} = require("../config/configKeys");

const Student = require("../models/student");
const PhdCord = require("../models/phdCord");
const Admin = require("../models/admin");
const AccountSec = require("../models/accountSec");

// const generateToken = ({ user, tokenKey, res }) => {
//   // Create token
//   const token = jwt.sign({ id: user._id, email: user.email }, tokenKey, {
//     expiresIn: "2h",
//   });
//   return res.json({
//     success: true,
//     token: token,
//   });
// };

exports.registerStudent = (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ error: "All input is required" });
    }
    // check if user already exist
    Student.findOne({ email }).then((oldStudent) => {
      if (oldStudent) {
        return res
          .status(409)
          .json({ error: "User Already Exist. Please Login" });
      }
      const newStudent = new Student({
        email: email,
        password: password,
      });
      newStudent.save().then((user) => {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          studentKey,
          { expiresIn: "2h" }
        );
        return res.json({
          success: true,
          token: token,
        });
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "could not create user" });
  }
};

const loginUser = (User, userKey, req, res) => {
  try {
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ error: "All input is required" });
    }
    // check if user exists
    User.findOne({ email }).then(async (user) => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        // generate token
        const token = jwt.sign({ id: user._id, email: user.email }, userKey, {
          expiresIn: "2h",
        });
        return res.json({
          success: true,
          token: token,
        });
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid Credentials" });
  }
};

exports.loginStudent = (req, res) => {
  loginUser(Student, studentKey, req, res);
};

exports.loginPhdCord = (req, res) => {
  loginUser(PhdCord, cordKey, req, res);
};

exports.loginAdmin = (req, res) => {
  loginUser(Admin, adminKey, req, res);
};

exports.loginAccountSec = (req, res) => {
  loginUser(AccountSec, accountSectionKey, req, res);
};

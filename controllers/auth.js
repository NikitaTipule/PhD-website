const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const {
  studentKey,
  cordKey,
  adminKey,
  accountSectionKey,
  ldapAuthUrl,
} = require("../config/configKeys");
const Student = require("../models/student");
const PhdCord = require("../models/phdCord");
const Admin = require("../models/admin");
const AccountSec = require("../models/accountSec");

const generateToken = (user, tokenKey) => {
  // Create token
  const token = jwt.sign({ id: user._id, email: user.email }, tokenKey, {
    expiresIn: "2h",
  });
  return {
    success: true,
    token: token,
  };
};

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
        const token = generateToken(user, studentKey);
        return res.json(token);
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "could not create user" });
  }
};

exports.loginStudent = (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate user input
    if (!(email && password)) {
      return res.status(400).json({ error: "All input is required" });
    }
    // check if user exists
    Student.findOne({ email }).then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        const token = generateToken(user, studentKey);
        return res.json(token);
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid Credentials" });
  }
};

const loginUser = (User, userKey, req, res) => {
  try {
    const { mis, password } = req.body;
    // Validate user input
    if (!(mis && password)) {
      return res.status(400).json({ error: "All input is required" });
    }
    const reqData = {
      MIS: mis,
      Password: password,
    };
    axios
      .post(ldapAuthUrl, reqData)
      .then((resp) => {
        User.findOne({ email: resp.data.Email }).then(async (user) => {
          if (!user) {
            return res.status(404).json({ error: "user not found" });
          }
          const token = generateToken(user, userKey);
          return res.json(token);
        });
      })
      .catch((err) => {
        if (err && err.response) {
          return res.status(400).json({ error: err.response.statusText });
        } else {
          return res.status(400).json({ error: "UNKNOWN_ERR" });
        }
      });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid Credentials" });
  }
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

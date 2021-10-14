const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { compare } = require("bcryptjs");
const axios = require("axios");
const { jwtSecretKey, ldapAuthUrl, baseURL } = require("../config/configKeys");
const roleToModel = require("./roles");
const sendEmail = require("./email");
const Student = require("../models/student");
const MailToken = require("../models/token");
const AccountSec = require("../models/accountSec");

const generateToken = (user) => {
  // Create token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    jwtSecretKey,
    {
      expiresIn: "2h",
    }
  );
  return {
    success: true,
    token: token,
  };
};

exports.registerStudent = (req, res) => {
  const { name, email, password } = req.body;
  if (!(name, email && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  Student.findOne({ email })
    .then((oldStudent) => {
      if (oldStudent) {
        return res
          .status(409)
          .json({ error: "User Already Exist. Please Login" });
      }
      const newStudent = new Student({ name, email, password });
      newStudent
        .save()
        .then((user) => {
          const token = new MailToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          });
          token
            .save()
            .then((token) => {
              const message = `${baseURL}/students/verifymail/${token.userId}/${token.token}`;
              console.log(message);
              // sendEmail(user.email, message);
              res.send("An Email sent to your account. Please verify");
            })
            .catch((err) =>
              res.status(500).json({ error: "internal server error" })
            );
        })
        .catch((err) =>
          res.status(400).json({ error: "could not create user" })
        );
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ error: "could not create user" });
    });
};

exports.verifyMail = async (req, res) => {
  try {
    const user = await Student.findById(req.params.userId).exec();
    if (!user) return res.status(400).send("Invalid link");

    if (user.mailVerified) return res.send("Email already verified");

    const token = await MailToken.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");
    user.mailVerified = true;
    await user.save();
    await MailToken.deleteOne({ _id: token._id }).exec();
    res.send("Email verified sucessfully. Please sign in");
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};

exports.loginStudent = (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  // check if user exists
  Student.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }
      if (!user.mailVerified) {
        return res.send(401).json({
          error: "Email is not verified, verify before trying to logIn",
        });
      }
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        user.role = Student.modelName;
        const token = generateToken(user);
        return res.json(token);
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Invalid Credentials" });
    });
};

exports.loginAccountSec = (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  if (!(email && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  // check if user exists
  AccountSec.findOne({ email })
    .then(async (user) => {
      if (!user) {
        return res.status(404).json({ error: "Email not found" });
      }
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        user.role = AccountSec.modelName;
        const token = generateToken(user);
        return res.json(token);
      } else {
        return res.status(400).json({ error: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ error: "Invalid Credentials" });
    });
};

exports.loginStaff = (req, res) => {
  const { mis, password, role } = req.body;
  if (!(mis && password && role)) {
    return res.status(400).json({ error: "All input is required" });
  }
  if (!(role in roleToModel)) {
    return res.status(400).json({ error: "invalid role" });
  }
  const reqData = {
    MIS: mis,
    Password: password,
  };
  axios
    .post(ldapAuthUrl, reqData)
    .then((resp) => {
      const User = roleToModel[role];
      User.findOne({ email: resp.data.Email }).then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "user not found" });
        }
        user.role = role;
        const token = generateToken(user);
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
};

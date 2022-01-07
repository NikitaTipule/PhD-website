const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { compare } = require("bcryptjs");
const axios = require("axios");
const { jwtSecretKey, ldapAuthUrl, baseURL } = require("../config/configKeys");
const roleToModel = require("./roles");
const sendEmail = require("./email");
const Student = require("../models/student");
const { MailOtp, PhoneOtp } = require("../models/token");
const AccountSec = require("../models/accountSec");
const PhdCord = require("../models/phdCord");
const Admin = require("../models/admin");

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
  const { name, email, mobile, password } = req.body;
  if (!(name, email, mobile && password)) {
    return res.status(400).json({ error: "All input is required" });
  }
  Student.findOne({ email })
    .then((old) => {
      if (old && old.mailVerified && old.mobileVerified) {
        return res
          .status(409)
          .json({ error: "User Already Exist. Please Login" });
      }
      const newStudent = new Student({ name, email, mobile, password });
      newStudent
        .save()
        .then((user) => {
          req.body.userId = user._id;
          return sendOtp(req, res);
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

const sendOtp = async (req, res) => {
  const userId = req.body.userId;
  MailOtp.deleteMany({ userId });
  PhoneOtp.deleteMany({ userId });

  const mailToken = new MailOtp({
    userId,
    otp: Math.floor(Math.random() * 899999 + 100000),
  });
  const phoneToken = new PhoneOtp({
    userId,
    otp: Math.floor(Math.random() * 899999 + 100000),
  });
  Promise.all([mailToken.save(), phoneToken.save()])
    .then(() => {
      const msg1 = `otp for mail verification is ${mailToken.otp}`;
      console.log(msg1);
      // sendEmail(user.email, message);
      const msg2 = `otp for mobile verification is ${phoneToken.otp}`;
      console.log(msg2);
      // sendSMS(user.email, message);
      res.send({
        userId,
        message:
          "OTP is sent to your email and mobile number. Please verify both",
      });
    })
    .catch((err) => res.status(500).json({ error: "internal server error" }));
};

exports.sendOtp = sendOtp;

exports.verifyMail = async (req, res) => {
  const { userId, otp } = req.body;
  console.log(userId, otp);
  try {
    const user = await Student.findById(userId).exec();
    if (!user) return res.status(400).send("Invalid user");
    if (user.mailVerified) return res.send("Email already verified");
    const token = await MailOtp.findOne({
      userId,
      otp,
    });
    console.log(userId, otp);
    if (!token) return res.status(400).send("Invalid otp");
    user.mailVerified = true;
    await Promise.all([
      user.save(),
      MailOtp.deleteOne({ _id: token._id }).exec(),
    ]);
    res.send("Email verified sucessfully.");
  } catch (error) {
    console.log(error);
    res.status(400).send("An error occured");
  }
};

exports.verifyMobile = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await Student.findById(userId).exec();
    if (!user) return res.status(400).send("Invalid user");
    if (user.mobileVerified) return res.send("Email already verified");
    const token = await PhoneOtp.findOne({
      userId,
      otp,
    });
    if (!token) return res.status(400).send("Invalid otp");
    user.mobileVerified = true;
    await Promise.all([
      user.save(),
      PhoneOtp.deleteOne({ _id: token._id }).exec(),
    ]);
    res.send("Mobile number verified sucessfully.");
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
        return res.json({
          otp_error: "Email is not verified, verify before trying to logIn",
          userId: user._id,
        });
      }
      if (!user.mobileVerified) {
        return res.json({
          otp_error:
            "Mobile number is not verified, verify before trying to logIn",
          userId: user._id,
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
  console.log(reqData);
  axios
    .post(ldapAuthUrl, reqData)
    .then((resp) => {
      console.log(resp);
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
      console.log(err);
      if (err && err.response) {
        return res.status(400).json({ error: err.response.statusText });
      } else {
        return res.status(400).json({ error: "UNKNOWN_ERR" });
      }
    });
};

exports.loginFaculty = (req, res) => {
  const { mis, password, role } = req.body;
  // Validate user input
  if (!(mis && password, role)) {
    return res.status(400).json({ error: "All input is required" });
  }
  // check if user exists
  if (role == "phdCord") {
    PhdCord.findOne({ mis })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "Email not found" });
        }

        isMatch = true;
        // const isMatch = await compare(password, user.password);
        if (isMatch) {
          user.role = PhdCord.modelName;
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
  } else if (role == "admin") {
    Admin.findOne({ mis })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "Email not found" });
        }

        isMatch = true;
        // const isMatch = await compare(password, user.password);
        if (isMatch) {
          user.role = Admin.modelName;
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
  } else {
    AccountSec.findOne({ mis })
      .then(async (user) => {
        if (!user) {
          return res.status(404).json({ error: "Email not found" });
        }

        isMatch = true;
        // const isMatch = await compare(password, user.password);
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
  }
};

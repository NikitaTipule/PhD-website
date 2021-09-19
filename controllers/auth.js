const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");
const axios = require("axios");
const { jwtSecretKey, ldapAuthUrl } = require("../config/configKeys");
const roleToModel = require("./roles");
const Student = require("../models/student");

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
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Validate user input
    if (!(name, email && password)) {
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
        name: name,
        email: email,
        password: password,
      });
      newStudent.save().then((user) => {
        user.role = Student.modelName;
        const token = generateToken(user);
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
        user.role = Student.modelName;
        const token = generateToken(user);
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

exports.loginStaff = (req, res) => {
  try {
    const { mis, password, role } = req.body;
    // Validate user input
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
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Invalid Credentials" });
  }
};

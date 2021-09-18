const jwt = require("jsonwebtoken");
const {
  studentToken,
  cordToken,
  adminToken,
  accountSectionToken,
} = require("../config");

const authHelper = (token_key, req, res, next) => {
  // get token from header
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // verify token
  try {
    jwt.verify(token, token_key, (err, decoded) => {
      if (err) {
        res.status(401).json({ msg: "Invalid Token" });
      } else {
        req.user = decoded.userId;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    return res.status(500).json({ msg: "Server Error" });
  }
};

const authStudent = (req, res, next) => {
  return authHelper(studentToken, req, res, next);
};

const authCord = (req, res, next) => {
  return authHelper(cordToken, req, res, next);
};

const authAdmin = (req, res, next) => {
  return authHelper(adminToken, req, res, next);
};

const authAccountSection = (req, res, next) => {
  return authHelper(accountSectionToken, req, res, next);
};

module.exports = { authStudent, authCord, authAdmin, authAccountSection };

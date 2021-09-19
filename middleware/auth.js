const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/configKeys");

exports.auth = (req, res, next) => {
  // get token from header
  const token = req.headers["phd-website-jwt"];
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Token is invalid" });
  }
};

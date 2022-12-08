const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../config/configKeys");
const { application_stage } = require("../state");

exports.auth = (req, res, next) => {
  // get token from header
  // req.userId = "616471b9d24e1e082c45e9a8";
  // req.userRole = "student";
  // return next();
  const token = req.headers["phd-website-jwt"];
  if (!token) {
    return res
      .status(401)
      .json({ jwt_error: "No token, authorization denied" });
  }
  // verify token
  try {
    const decoded = jwt.verify(token, jwtSecretKey);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    const editRoutes = [
      "/edit/docs",
      "/edit/info",
      "/edit/fee",
      "/lock",
      "/upload",
    ];
    if (editRoutes.includes(req.path)) {
      if (application_stage === "closed") {
        return res.status(401).json("application is closed");
      }
    }
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ jwt_error: "Token is invalid" });
  }
};

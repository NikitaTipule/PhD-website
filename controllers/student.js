const Student = require("../models/student");

exports.myProfileStudent = (req, res) => {
  if (!req.userId) res.status(400).json({ error: "id is required" });
  Student.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    delete user.password;
    res.json({ user });
  });
};

exports.getStudentInfo = (req, res) => {
  if (!(req.userRole == "phdCord" || req.userRole == "admin")) {
    return res.status(403).json("error : user don't have access to resource");
  }
  id = req.params && req.params.userId;
  if (!id) res.status(400).json({ error: "id is required" });
  Student.findById(id, "-password", (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    res.json({ user });
  });
};

exports.getStudentsByDept = (req, res) => {
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).json({ error: "department is needed" });
  }

  let projection = "";
  if (req.userRole == "phdCord" || req.userRole == "admin") {
    projection = "name verification";
  } else if (req.userRole == "accountSec") {
    projection = "name personalInfo.category feeDetails";
  } else {
    return res.status(403).json("error : user don't have access to resource");
  }

  Student.find(
    { "personalInfo.department": department },
    projection,
    (err, users) => {
      if (err) {
        res.status(400).json({ error: "invalid request" });
      }
      return res.json(users);
    }
  );
};

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

// ignore changes made to verification data by user and mark updates documents as unverified
const maintainVerification = (newDocs, origDocs) => {
  if (!newDocs) {
    return newDocs;
  }
  origMap = origDocs.reduce((map, obj) => {
    map[obj.type] = obj;
  }, {});
  for (let i = 0; i < newDocs.length; i++) {
    const orig = origMap[newDocs[i].type];
    const isSame = orig && newDocs[i].filename == orig.filename;
    newDocs[i].verification = isSame ? orig.verification : "pending";
  }
  return newDocs;
};

exports.editStudentDocs = async (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can update his info" });
  }
  try {
    const user = await Student.findById(req.userId).exec();
    user.documentsUploaded = maintainVerification(
      req.body.documentsUploaded,
      user.documentsUploaded
    );
    user.save();
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.editStudentFeeDetails = async (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can update his info" });
  }
  try {
    const user = await Student.findById(req.userId).exec();
    user.feeDetails = req.body.feeDetails;
    user.feeDetails.verification = "pending";
    user.save();
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.editStudentInfo = async (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can update his info" });
  }
  // user can edit any of these fields using this route
  let fields = ["personalInfo", "academicsUG", "academicsPG", "footerData"];
  fields = fields.filter((field) => field in req.body);
  try {
    const user = await Student.findById(req.userId).exec();
    for (const field of fields) {
      user[field] = req.body[field];
    }
    user.save();
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

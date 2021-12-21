const Student = require("../models/student");
const Counter = require("../models/counter");

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
    projection = "name infoVerified feeDetails.verification";
  } else if (req.userRole == "accountSec") {
    projection = "name personalInfo.category feeDetails";
  } else {
    return res.status(403).json("error : user don't have access to resource");
  }

  Student.find({ "personalInfo.department": department }, projection)
    .lean()
    .exec()
    .then((users) => {
      if (req.userRole !== "accountSec") {
        users = users.map((t) => {
          t.feeVerified = t.feeDetails.verification;
          delete t["feeDetails"];
          return t;
        });
      }
      return res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ error: "invalid request" });
    });
};

exports.lockProfile = (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can confirm his profile" });
  }
  Student.findById(req.userId, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ err });
    }
    user.editable = false;
    const dept = user.personalInfo.department;
    Counter.findOne({ department: dept }, (err, counter) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
      counter.index = counter.index + 1;
      const ind = counter.index.toString().padStart(3, "0");
      const appId = `PH21${counter.code}${ind}`;
      user.applicationId = appId;
      Promise.all([user.save(), counter.save()])
        .then(() => {
          res.json({ success: "true", applicationId: appId });
        })
        .catch((e) => {
          console.log(e);
          return res.status(400).json({ err });
        });
    });
  });
};

// ignore changes made to verification data by user and mark updates documents as unverified
const maintainVerification = (newDocs, origDocs) => {
  if (!newDocs) {
    return newDocs;
  }
  origMap = origDocs.reduce((map, obj) => {
    map[obj.filename] = obj;
    return map;
  }, {});
  return newDocs.map((doc) => {
    const orig = origMap[doc.filename];
    const isSame = orig && doc.type === orig.type;
    doc.verification = isSame ? orig.verification : "pending";
    return doc;
  });
};

exports.editStudentDocs = async (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can update his info" });
  }
  try {
    const user = await Student.findById(req.userId).exec();
    if (!user.editable) {
      return res.status(403).json({ error: "Your profile is locked" });
    }
    user.documentsUploaded = maintainVerification(
      req.body.documentsUploaded,
      user.documentsUploaded
    );
    await user.save();
    res.json({ success: "true" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.editStudentFeeDetails = async (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can update his info" });
  }
  try {
    const user = await Student.findById(req.userId).exec();
    if (!user.editable) {
      return res.status(403).json({ error: "Your profile is locked" });
    }
    user.feeDetails = req.body.feeDetails;
    user.feeDetails.verification = "pending";
    await user.save();
    res.json({ success: "true" });
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.editStudentInfo = async (req, res) => {
  if (req.userRole != "student") {
    res.status(403).json({ error: "only student can update his info" });
  }
  // user can edit any of these fields using this route
  const field_list = [
    "personalInfo",
    "academicsUG",
    "academicsPG",
    "entranceDetails",
  ];
  const fields = field_list.filter((field) => field in req.body);
  try {
    const user = await Student.findById(req.userId).exec();
    if (!user.editable) {
      return res.status(403).json({ error: "Your profile is locked" });
    }
    for (const field of fields) {
      user[field] = req.body[field];
    }
    await user.save().catch((err) => {
      console.log(err);
      return res.json({ error: "couldn't update record" });
    });
    res.json({ success: "true" });
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.verifyFeeDetails = async (req, res) => {
  console.log(req.userId);
  console.log(req.userRole);
  if (req.userRole != "accountSec") {
    res
      .status(403)
      .json({ error: "only account section can update fee verification" });
  }
  const { studentId, verification, remarks } = req.body;
  console.log(studentId);
  console.log(verification);
  console.log(remarks);
  if (!(studentId && verification)) {
    res
      .status(403)
      .json({ error: "studentId or verification status is missing" });
  }
  try {
    await Student.updateOne(
      { _id: studentId },
      {
        $set: {
          "feeDetails.verification": verification,
          "feeDetails.remarks": remarks,
          editable: verification === "mod_req",
        },
      }
    );
    res.json({ success: "true" });
  } catch (error) {
    res.status(403).json({ error: "invalid request" });
  }
};

const applyVerification = (newDocs, origDocs) => {
  const newMap = newDocs.reduce((map, obj) => {
    map[obj.filename] = obj.verification;
    return map;
  }, {});
  return origDocs.map((doc) => {
    const newStatus = newMap[doc.filename];
    if (newStatus) {
      doc.verification = newStatus;
    }
    return doc;
  });
};

const infoVerifiedStatus = (user) => {
  const field_list = [
    "personalInfo",
    "academicsUG",
    "academicsPG",
    "entranceDetails",
  ];

  let dv = 0,
    dp = 0,
    dm = 0,
    docVerification = "pending";
  user.documentsUploaded.map((doc) => {
    if (doc.verification === "mod_req") {
      dm = dm + 1;
    } else if (doc.verification === "pending") {
      dp = dp + 1;
    } else {
      dv = dv + 1;
    }
  });
  if (dm > 0) {
    docVerification = "mod_req";
  } else if (dp === 0 && dm === 0) {
    docVerification = "verified";
  }

  let v = 0,
    p = 0,
    m = 0;
  for (let f of field_list) {
    if (user[f].verification === "mod_req") {
      m = m + 1;
    } else if (user[f].verification === "pending") {
      p = p + 1;
    } else {
      v = v + 1;
    }
  }

  if (documentsUploaded.length() === 0) {
    docVerification = "pending";
  }

  if (p === 0 && m === 0 && docVerification === "verified") return "verified";
  if (m > 0 || docVerification === "mod_req") return "mod_req";
  return "pending";
};

exports.verifyStudentInfo = (req, res) => {
  if (!(req.userRole == "phdCord" || req.userRole == "admin")) {
    res.status(403).json({ error: "you don't have access" });
  }
  if (!req.body.studentId) {
    req.status(400).json({ error: "studentId is not present" });
  }
  Student.findById(req.body.studentId, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    try {
      user.personalInfo.verification = req.body.personalInfoStatus;
      user.personalInfo.remarks = req.body.personalInfoRemark;
      user.academicsUG.verification = req.body.academicsUGStatus;
      user.academicsUG.remarks = req.body.academicsUGRemark;
      user.academicsPG.verification = req.body.academicsPGStatus;
      user.academicsPG.remarks = req.body.academicsPGRemark;
      user.entranceDetails.verification = req.body.entranceDetailsStatus;
      user.entranceDetails.remarks = req.body.entranceDetailsRemark;
      user.remarks = req.body.remarks;

      user.infoVerified = infoVerifiedStatus(user);

      if (user.infoVerified === "mod_req") {
        user.editable = true;
      } else {
        user.editable = false;
      }

      user.documentsUploaded = applyVerification(
        req.body.documentsUploaded,
        user.documentsUploaded
      );
      user
        .save()
        .then(() => res.json({ success: true }))
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ error: "couldn't save updated record to database" });
        });
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: "request body contains invalid data" });
    }
  });
};

exports.getAllStudentsInfoByDept = (req, res) => {
  console.log(req);
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).json({ error: "department is needed" });
  }

  let projection = "";
  if (req.userRole == "phdCord" || req.userRole == "admin") {
    projection =
      "personalInfo.name personalInfo.middleName email personalInfo.gender personalInfo.dob personalInfo.mobile personalInfo.nationality personalInfo.category personalInfo.aadhar personalInfo.address personalInfo.physicallyDisabled personalInfo.deparment personalInfo.verification personalInfo.remarks academicsUG.institute academicsUG.degree academicsUG.specialization academicsUG.totalAggregate academicsUG.cgpa10 academicsUG.percentageMarks academicsUG.totalMarks academicsUG.dateOfDeclaration academicsPG.institute academicsPG.degree academicsPG.totalAggregate academicsPG.totalMarks academicsPG.cgpa10 academicsPG.percentageMarks academicsPG.verification academicsPG.remarks entranceDetails";
  } else if (req.userRole == "accountSec") {
    projection = "name personalInfo.category feeDetails";
  } else {
    return res.status(403).json("error : user don't have access to resource");
  }

  Student.find({ "personalInfo.department": department }, projection)
    .lean()
    .exec()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ error: "invalid request" });
    });
};

const Student = require("../models/student");
const Counter = require("../models/counter");
const send_email = require("./email");
const { application_stage } = require("../state");
const logger = require("../util/logger");

exports.myProfileStudent = (req, res) => {
  if (!req.userId) {
    return res.status(400).json({ error: "id is required" });
  }
  Student.findById(req.userId, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    delete user.password;
    if (application_stage === "closed") {
      user.editable = false;
    }
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

// return students of specific departments which are verified by account section
exports.getStudentsByDept = (req, res) => {
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).json({ error: "department is needed" });
  }

  let projection = "";
  let filter = {
    "personalInfo.department": department,
    applicationId: { $exists: true, $ne: null },
  };
  if (req.userRole == "phdCord" || req.userRole == "admin") {
    projection = "name applicationId infoVerified feeDetails.verification";
  } else if (req.userRole == "accountSec") {
    projection = "name applicationId personalInfo.category feeDetails";
  } else {
    return res.status(403).json("error : user don't have access to resource");
  }
  Student.find(filter, projection)
    .lean()
    .exec()
    .then((users) => {
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
    if (!user.applicationId) {
      const dept = user.personalInfo.department;
      Counter.findOne({ department: dept }, (err, counter) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ err });
        }
        counter.index = counter.index + 1;
        const ind = counter.index.toString().padStart(3, "0");
        const appId = `PhD22${counter.code}${ind}`;
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
    } else {
      user
        .save()
        .then(() => {
          res.json({ success: "true", applicationId: user.applicationId });
        })
        .catch((e) => {
          console.log(e);
          return res.status(400).json({ err });
        });
    }
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
    if (!user.editable || user.feeDetails.verification === "verified") {
      return res.status(403).json({ error: "Your fee details are locked" });
    }
    user.feeDetails = req.body.feeDetails;
    user.feeDetails.verification = "pending";
    await user.save();
    return res.json({ success: "true" });
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.editStudentInfo = async (req, res) => {
  if (req.userRole != "student") {
    return res.status(403).json({ error: "only student can update his info" });
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
      if (user[field].verification !== "verified") {
        user[field] = req.body[field];
        user[field].verification = "pending";
        user.infoVerified = "pending";
      }
    }
    await user.save().catch((err) => {
      console.log(err);
      return res.json({ error: "couldn't update record" });
    });
    return res.json({ success: "true" });
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

exports.verifyFeeDetails = async (req, res) => {
  if (req.userRole != "accountSec") {
    res
      .status(403)
      .json({ error: "only account section can update fee verification" });
  }
  const { studentId, verification, remarks } = req.body;
  if (!(studentId && verification)) {
    res
      .status(403)
      .json({ error: "studentId or verification status is missing" });
  }

  Student.findById(studentId, (err, user) => {
    if (err || !user) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    user.feeDetails.verification = verification;
    user.feeDetails.remarks = remarks;
    user.feeDetails.completed = verification !== "mod_req";
    user.editable = user.editable || verification === "mod_req";
    send_email(
      user.email,
      "Your fee details are reviewed. Please check the status on portal.",
      "COEP Technological University - Ph.D. Porgram Application Update"
    );
    user
      .save()
      .then(() => {
        logger.info(
          `Accounts Section ${req.email} verified ${user.personalInfo.name}`
        );
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ error: "couldn't save updated record to database" });
      });
  });
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

  let dp = 0,
    dm = 0,
    docVerification = "pending";
  for (let doc of user.documentsUploaded) {
    if (doc.verification === "mod_req") {
      dm = dm + 1;
    } else if (doc.verification === "pending") {
      dp = dp + 1;
    }
  }

  if (dm > 0) {
    docVerification = "mod_req";
  } else if (dp === 0) {
    docVerification = "verified";
  }

  let p = 0,
    m = 0;
  for (let f of field_list) {
    if (user[f].verification === "mod_req") {
      m = m + 1;
    } else if (user[f].verification === "pending") {
      p = p + 1;
    }
  }

  if (user.documentsUploaded.length === 0) {
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
      user.remarks = req.body.remarks;
      const field_list = [
        "personalInfo",
        "academicsUG",
        "academicsPG",
        "entranceDetails",
      ];
      for (let field of field_list) {
        user[field].verification = req.body[field].status;
        user[field].remarks = req.body[field].remarks;
        user[field].completed = user[field].verification !== "mod_req";
      }
      user.documentsUploaded = applyVerification(
        req.body.documentsUploaded,
        user.documentsUploaded
      );

      user.infoVerified = infoVerifiedStatus(user);

      user.editable = user.editable || user.infoVerified === "mod_req";
      send_email(
        user.email,
        "Your application is reviewed. Please check the status on portal.",
        "COEP Technological University - Ph.D. Porgram Application Update"
      );
      user
        .save()
        .then(() => {
          logger.info(
            `${req.userRole} ${req.email} verified ${user.personalInfo.name}`
          );
          res.json({ success: true });
        })
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

// returns data of students who have submitted applicstion
exports.getAllStudentsInfoByDept = (req, res) => {
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).json({ error: "department is needed" });
  }

  let projection = "";
  let filter = {
    "personalInfo.department": department,
    applicationId: { $exists: true, $ne: null },
  };
  if (req.userRole == "phdCord" || req.userRole == "admin") {
    projection =
      "mobile personalInfo.name personalInfo.middleName email personalInfo.gender personalInfo.dob personalInfo.mobile personalInfo.nationality personalInfo.category personalInfo.aadhar personalInfo.address personalInfo.physicallyDisabled personalInfo.employed personalInfo.domicile personalInfo.deparment personalInfo.verification personalInfo.remarks academicsUG.institute academicsUG.degree academicsUG.specialization academicsUG.totalAggregate academicsUG.cgpa10 academicsUG.percentageMarks academicsUG.totalMarks academicsUG.dateOfDeclaration academicsPG.institute academicsPG.degree academicsPG.totalAggregate academicsPG.totalMarks academicsPG.cgpa10 academicsPG.percentageMarks academicsPG.verification academicsPG.remarks entranceDetails";
  } else if (req.userRole == "accountSec") {
    projection = "name personalInfo.category feeDetails";
    filter = {
      "personalInfo.department": department,
      applicationId: { $exists: true, $ne: null },
    };
  } else {
    return res.status(403).json("error : user don't have access to resource");
  }

  Student.find(filter, projection)
    .lean()
    .exec()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ error: "invalid request" });
    });
};

// return data of students who have not yet submitted application ID
exports.getPartialApplications = (req, res) => {
  if (!(req.userRole == "phdCord" || req.userRole == "admin")) {
    return res.status(403).json("error : user don't have access to resource");
  }
  const department = req.params && req.params.department;
  if (!department) {
    return res.status(400).json({ error: "department is needed" });
  }
  let filter = {
    "personalInfo.department": department,
    applicationId: { $exists: false },
  };
  if (department === "all") {
    filter = { applicationId: { $exists: false } };
  }
  let projection =
    "name personalInfo.completed academicsUG.completed academicsPG.completed entranceDetails.completed feeDetails.completed";
  Student.find(filter, projection)
    .lean()
    .exec()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ error: "invalid request" });
    });
};

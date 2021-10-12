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
    map[obj.filename] = obj;
  }, {});
  return newDocs.map((doc) => {
    const orig = origMap[doc.filename];
    const isSame = orig && doc.type == orig.type;
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
    user.documentsUploaded = maintainVerification(
      req.body.documentsUploaded,
      user.documentsUploaded
    );
    await user.save();
    res.json({ success: "true" });
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
  let fields = ["personalInfo", "academicsUG", "academicsPG", "footerData"];
  fields = fields.filter((field) => field in req.body);
  try {
    const user = await Student.findById(req.userId).exec();
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
  try {
    await Student.updateOne(
      { _id: studentId },
      {
        $set: {
          "feeDetails.verification": verification,
          "feeDetails.remarks": remarks,
        },
      }
    );
    res.json({ success: "true" });
  } catch (error) {
    res.status(403).json({ error: "invalid request" });
  }
};

// // detect docs changes except verification
// const didDocsChange = (oldDocs, newDocs) => {
//   if (oldDocs.length != newDocs.length) {
//     return true;
//   }
//   for (let i = 0; i < oldDocs.length; i++) {
//     if (oldDocs[i].type != newDocs[i].type) return true;
//     if (oldDocs[i].filename != newDocs[i].filename) return true;
//   }
//   return false;
// };

const applyVerification = (newDocs, origDocs) => {
  const newMap = newDocs.reduce((map, obj) => {
    map[obj.filename] = obj.verification;
  }, {});
  return origDocs.map((doc) => {
    const newDoc = newMap[doc.filename];
    if (newDoc) {
      doc.verification = newDoc.verification;
    }
    return doc;
  });
};

exports.verifyStudent = async (req, res) => {
  if (!(req.userRole == "phdCord" || req.userRole == "phdCord")) {
    res.status(403).json({ error: "you don't have access" });
  }
  const { studentId, verification, documentsUploaded, remarks } = req.body;
  try {
    const user = await Student.findById(studentId).exec();
    user.verification = verification;
    user.remarks = remarks;

    user.documentsUploaded = applyVerification(
      documentsUploaded,
      user.documentsUploaded
    );

    // //we can avoid above complicated logic by imposing restriction that request should not change document array
    // //except verification status
    // if (didDocsChange(user.documentsUploaded, documentsUploaded)) {
    //   res
    //     .status(400)
    //     .json({ error: "docs should not change except verification" });
    // }
    // user.documentsUploaded = documentsUploaded;

    await user.save();
    res.json({ success: "true" });
  } catch (error) {
    res.status(400).json({ error: "request body contains invalid data" });
  }
};

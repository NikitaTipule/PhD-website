const Link = require("../models/links");
const PhdCord = require("../models/phdCord");
const Student = require("../models/student");

exports.getPhdCordInfo = (req, res) => {
  if (!req.userRole == "admin") {
    return res.status(403).json("error : user don't have access to resource");
  }
  id = req.params && req.params.cordId;
  if (!id) res.status(400).json({ error: "id is required" });
  PhdCord.findById(id, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    res.json({ user });
  });
};

exports.getAllCords = async (req, res) => {
  try {
    if (!req.userRole == "admin") {
      return res.status(403).json("error : user don't have access to resource");
    }
    var agg = [
      {
        $group: {
          _id: {
            department: "$personalInfo.department",
            infoVerified: "$infoVerified",
          },
          total: { $sum: 1 },
        },
      },
    ];
    console.log(agg);
    const result = await Student.aggregate(agg);
    const vf = {};
    for (const curr of result) {
      // console.log(curr);
      const { department, infoVerified } = curr._id;
      if (!vf[department]) vf[department] = {};
      vf[department][infoVerified] = curr.total;
    }
    let cords = await PhdCord.find({}, "name department").lean().exec();
    for (let i = 0; i < cords.length; i++) {
      cords[i].status = vf[cords[i].department];
    }
    // console.log(vf);
    return res.json(cords);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error" });
  }
};

exports.addPhdCord = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can add phdCord" });
  }
  const { name, mis, email, department } = req.body;
  if (!(name && mis && email && department)) {
    res.status(400).json({ error: "missing data" });
  }
  PhdCord.findOne({ mis }).then((oldUser) => {
    if (oldUser) {
      return res
        .status(409)
        .json({ error: "User Already Exist. Please ask to Login" });
    }
    const user = new PhdCord({ name, mis, email, department });
    user
      .save()
      .then((user) => res.json({ email }))
      .catch((err) => {
        console.log(err);
        res.status(400).json({ err: "invalid data" });
      });
  });
};

exports.removePhdCord = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can remove phdCord" });
  }
  const mis = req.body.mis;
  if (!mis) {
    return res.status(400).json({ error: "missing paramters" });
  }
  PhdCord.deleteOne(mis, (err, doc) => {
    if (err || !doc || doc.deletedCount == 0) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json({ success: "true" });
  });
};

exports.addLink = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can add link" });
  }
  const title = req.body.title;
  const link = req.body.link;
  if (!title || !link) {
    return res.status(404).json({ error: "error" });
  }
  const user = new Link({ title, link });
  user
    .save()
    .then((user) => res.json({ link }))
    .catch((err) => {
      console.log(err);
      res.status(400).json({ err: "invalid data" });
    });
};

exports.removeLink = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can remove links" });
  }
  const id = req.body.id;
  if (!id) {
    return res.status(400).json({ error: "missing paramters" });
  }
  Link.deleteOne(id, (err, doc) => {
    if (err || !doc || doc.deletedCount == 0) {
      return res.status(404).json({ error: "user not found" });
    }
    return res.json({ success: "true" });
  });
};

exports.getAllLinks = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin person can access" });
  }

  Link.find()
    .lean()
    .exec()
    .then((users) => {
      return res.json(users);
    })
    .catch((err) => {
      res.status(400).json({ error: "invalid request" });
    });
};

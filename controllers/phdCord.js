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
            verification: "$verification",
          },
          total: { $sum: 1 },
        },
      },
    ];

    const result = await Student.aggregate(agg);
    const vf = {};
    for (const curr of result) {
      const { department, verification } = curr._id;
      if (!vf[department]) vf[department] = {};
      vf[department][verification] = curr.total;
    }
    let cords = await PhdCord.find({}, "name department").lean().exec();
    for (let i = 0; i < cords.length; i++) {
      cords[i].status = vf[cords[i].department];
    }
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
  const user = new PhdCord({ name, mis, email, department });
  user
    .save()
    .then((res) => res.json(res))
    .catch((err) => res.status(400).json("invalid data"));
};

exports.removePhdCord = (req, res) => {
  if (req.userRole != "admin") {
    res.status(403).json({ error: "only admin can remove phdCord" });
  }
  const cordId = req.params && req.params.cordId;
  if (!cordId) {
    return res.status(400).json({ error: "missing paramters" });
  }
  PhdCord.findByIdAndDelete(cordId, (err, doc) => {
    if (err || !doc) return res.status(404).json({ error: "user not found" });
    return res.json({ success: "true" });
  });
};

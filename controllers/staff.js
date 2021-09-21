// Functionality common to staff users (non-Student users)

const roleToModel = require("./roles");

exports.myProfileStaff = (req, res) => {
  if (!req.userId) res.status(400).json({ error: "id is required" });
  const User = roleToModel[userRole];
  User.findById(id, (err, user) => {
    if (err) {
      return res.status(404).json({ error: "user doesn't exist" });
    }
    res.json({ user });
  });
};

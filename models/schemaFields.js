const bcrypt = require("bcryptjs");

exports.reqString = {
  type: String,
  required: true,
};

exports.email = {
  type: String,
  trim: true,
  lowercase: true,
  unique: true,
  required: "Email address is required",
  match: [
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    "Please fill a valid email address",
  ],
};

exports.departmentField = {
  type: String,
  required: true,
  enum: [
    "Civil Engineering",
    "Computer Engineering",
    "Electrical Engineering",
    "Electronics & Telecommunication Engineering",
    "Instrumentation & Control Engineering",
    "Mechanical Engineering",
    "Metallurgical Engineering",
    "Production Engineering",
  ],
};

exports.preSaveHashPassword = function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
};

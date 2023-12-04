const mongoose = require("mongoose");
const { reqString, departmentField, email, preSaveHashPassword,  } = require("./schemaFields");

const PhdCordSchema = mongoose.Schema({
  name: reqString,
  mis: reqString,
  email: email,
  department: departmentField,
  password : reqString
});

PhdCordSchema.pre("save", preSaveHashPassword)

const PhdCord = mongoose.model("phdCord", PhdCordSchema, "phdCords");

module.exports = PhdCord;

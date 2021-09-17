const mongoose = require("mongoose");
const {
  reqString,
  departmentField,
  email,
  preSaveHashPassword,
} = require("./schemaFields");

const PhdCordSchema = mongoose.Schema({
  name: reqString,
  email: email,
  password: reqString,
  department: departmentField,
});

PhdCordSchema.pre("save", preSaveHashPassword);

const PhdCord = mongoose.model("phdCord", PhdCordSchema, "phdCord");

module.exports = PhdCord;

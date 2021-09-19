const mongoose = require("mongoose");
const { reqString, departmentField, email } = require("./schemaFields");

const PhdCordSchema = mongoose.Schema({
  name: reqString,
  mis: reqString,
  email: email,
  department: departmentField,
});

const PhdCord = mongoose.model("phdCord", PhdCordSchema, "phdCords");

module.exports = PhdCord;

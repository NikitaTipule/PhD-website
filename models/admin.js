const mongoose = require("mongoose");
const { reqString, email } = require("./schemaFields");

const AdminSchema = mongoose.Schema({
  name: reqString,
  mis: reqString,
  email: email,
});

const Admin = mongoose.model("Admin", AdminSchema, "admin");

module.exports = Admin;

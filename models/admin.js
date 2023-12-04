const mongoose = require("mongoose");
const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const AdminSchema = mongoose.Schema({
  name: reqString,
  mis: reqString,
  email: email,
  password : reqString,
});

AdminSchema.pre("save", preSaveHashPassword)

const Admin = mongoose.model("admin", AdminSchema, "admins");

module.exports = Admin;

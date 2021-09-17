const mongoose = require("mongoose");
const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const AdminSchema = mongoose.Schema({
  // name if needed
  email: email,
  password: reqString,
});

AdminSchema.pre("save", preSaveHashPassword);

const Admin = mongoose.model("Admin", AdminSchema, "admin");

module.exports = Admin;

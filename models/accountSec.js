const mongoose = require("mongoose");
const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const accountSecSchema = mongoose.Schema({
  name: reqString,
  email: email,
  password: { type: String },
});

accountSecSchema.pre("save", preSaveHashPassword);
const AccountSec = mongoose.model("accountSec", accountSecSchema, "accountSec");

module.exports = AccountSec;

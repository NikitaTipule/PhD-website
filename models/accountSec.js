const mongoose = require("mongoose");
const { reqString, email, preSaveHashPassword } = require("./schemaFields");

const accountSecSchema = mongoose.Schema({
  email: email,
  password: reqString,
});

accountSecSchema.pre("save", preSaveHashPassword);

const AccountSec = mongoose.model("accountSec", accountSecSchema, "accountSec");

module.exports = AccountSec;

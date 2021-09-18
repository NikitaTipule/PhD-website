const mongoose = require("mongoose");
const { reqString, email } = require("./schemaFields");

const accountSecSchema = mongoose.Schema({
  name: reqString,
  mis: reqString,
  email: email,
});

const AccountSec = mongoose.model("accountSec", accountSecSchema, "accountSec");

module.exports = AccountSec;

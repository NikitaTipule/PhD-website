const mongoose = require("mongoose");
const { reqString } = require("./schemaFields");

const LinkSchema = mongoose.Schema({
  title: reqString,
  link: reqString,
});

const Link = mongoose.model("link", LinkSchema, "links");
module.exports = Link;

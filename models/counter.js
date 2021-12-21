const mongoose = require("mongoose");

const CounterSchema = mongoose.Schema({
  department: {
    type: String,
    unique: true,
  },
  code: {
    type: String,
  },
  index: { type: Number, default: 0 },
});

const Admin = mongoose.model("counter", CounterSchema, "counter");

module.exports = Admin;

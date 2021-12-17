const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});
exports.MailOtp = mongoose.model("mailOTP", otpSchema, "mailOTP");
exports.PhoneOtp = mongoose.model("phoneOTP", otpSchema, "phoneOTP");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

exports.Token = mongoose.model("token", tokenSchema, "tokens");

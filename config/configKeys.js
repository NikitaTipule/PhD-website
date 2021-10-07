require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  jwtSecretKey: process.env.JWT_SECRET,
  ldapAuthUrl: "http://210.212.183.21/auth",
  emailNodemailer: process.env.MAIL,
  passwordNodemailer: process.env.MAIL_PASSWORD,
  baseURL: process.env.BASE_URL,
};
